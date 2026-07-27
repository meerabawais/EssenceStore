import { NextResponse } from "next/server";

export async function PUT(request,{params}){
    const {id}=await params;
    const body = await request.json();
    const updated = await prisma.subCategory.update({
        where:{
            id:Number(id)
        },

        data:{
            name:body.name,
            status:body.status,
            categoryId:Number(body.categoryId)
        }
    });
    return NextResponse.json(updated);
}
export async function DELETE(request,{params}){

    const {id}=await params;

    await prisma.product.deleteMany({

        where:{
            subCategoryId:Number(id)
        }

    });

    await prisma.subCategory.delete({

        where:{
            id:Number(id)
        }

    });

    return NextResponse.json({
        message:"Deleted"
    });

}