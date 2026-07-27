import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        subCategory: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {

    try {

        const body = await request.json();

        const product = await prisma.product.create({

            data: {

                categoryId: Number(body.categoryId),

                subCategoryId: Number(body.subCategoryId),

                brand: body.brand,

                name: body.name,

                description: body.description,

                status: body.status,

                variants: {

                    create: {

                        size: body.variant.size,

                        color: body.variant.color,

                        price: Number(body.variant.price),

                        stock: Number(body.variant.stock),

                        image1: body.variant.image1,

                        image2: body.variant.image2,

                        discountValue: Number(body.variant.discountValue),

                        discountType: body.variant.discountType,

                    }

                }

            },

            include: {

                category: true,

                subCategory: true,

                variants: true,

            }

        });

        return NextResponse.json(product);

    }

    catch(error){

        console.log(error);

        return NextResponse.json(

            {error:error.message},

            {status:500}

        );

    }

}
