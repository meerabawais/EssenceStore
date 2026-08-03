import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const orders = await prisma.order.findMany({
        include: {
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(orders);
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