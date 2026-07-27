import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){

    try{

        const {id}=await params;

        const body=await request.json();

        const variantId=body.variant.id;

        await prisma.product.update({

            where:{
                id:Number(id)
            },

            data:{

                categoryId:Number(body.categoryId),

                subCategoryId:Number(body.subCategoryId),

                brand:body.brand,

                name:body.name,

                description:body.description,

                status:body.status,

            }

        });

        await prisma.variant.update({

            where:{
                id:Number(variantId)
            },

            data:{

                size:body.variant.size,

                color:body.variant.color,

                price:Number(body.variant.price),

                stock:Number(body.variant.stock),

                image1:body.variant.image1,

                image2:body.variant.image2,

                discountValue:Number(body.variant.discountValue),

                discountType:body.variant.discountType,

            }

        });

        const product=await prisma.product.findUnique({

            where:{
                id:Number(id)
            },

            include:{

                category:true,

                subCategory:true,

                variants:true,

            }

        });

        return NextResponse.json(product);

    }

    catch(error){

        return NextResponse.json(

            {error:error.message},

            {status:500}

        );

    }

}

export async function DELETE(request,{params}){

    const {id}=await params;

    await prisma.variant.deleteMany({

        where:{
            productId:Number(id)
        }

    });

    await prisma.product.delete({

        where:{
            id:Number(id)
        }

    });

    return NextResponse.json({

        message:"Deleted"

    });

}