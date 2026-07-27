import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();
    const subCategory = await prisma.subCategory.create({
        data:{
            name:body.name,
            categoryId:Number(body.categoryId),
            status:body.status
        },
    });
    return NextResponse.json(subCategory);
}

