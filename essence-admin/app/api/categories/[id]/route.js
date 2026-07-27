import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE (request,{params}){
    const {id} = await params;
    await prisma.product.deleteMany({
        where: {
            categoryId: Number(id),
        },
    }),
    await prisma.subCategory.deleteMany({
        where: {
            categoryId: Number(id),
        },
    });
    await prisma.Category.deleteMany({
        where: {
            id : Number(id),
        },
    });
    return NextResponse.json({
        message: "Deleted",
    });
}
export async function PUT(request,{params}){

    const {id}=await params;

    const body=await request.json();

    const updated=await prisma.category.update({

        where:{
            id:Number(id)
        },

        data:{
            name:body.name,
            status:body.status
        }

    });

    return NextResponse.json(updated);

}
