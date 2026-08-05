import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const skip = (page - 1) * pageSize;

   const search = searchParams.get("search") || "";

const where =
  search === ""
    ? {}
    : {
        OR: [
             ...(isNaN(Number(search))
                      ? []
                      : [{ id: Number(search) }]),

          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };

const totalOrders = await prisma.order.count({
    where,
});

const orders = await prisma.order.findMany({
    where,
    include: {
        items: true,
    },
    orderBy: {
        createdAt: "desc",
    },
    skip,
    take: pageSize,
});

    return NextResponse.json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / pageSize),
      currentPage: page,
    });

  } 
  catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      error: error.message,
    },
    {
      status: 500,
    }
  );
}
}
export async function POST(request) {

    try {

        const body = await request.json();

        const {

            items = [],

            ...data

        } = body;
        const order = await prisma.order.create({

            data: {

                ...data,

                products: items,

                items: {

                    create: items.map(item => ({

                        productId: Number(item.productId),

                        variantId: Number(item.variantId),

                        productName: item.productName,
                        productImage: item.productImage,

                        size: item.size,

                        color: item.color,

                        quantity: Number(item.quantity),

                        price: Number(item.price),

                        total: Number(item.total),

                    })),

                },

            },

            include: {

                items: true,

            },

        });

        return NextResponse.json(order);

    }

    catch(error){

        console.error(error);

        return NextResponse.json(

            {

                error:error.message,

            },

            {

                status:500,

            }

        );

    }

}