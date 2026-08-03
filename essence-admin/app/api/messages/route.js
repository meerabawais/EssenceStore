import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(){
    try{
        const conversations = await prisma.ContactInfo.findMany({
            include: {
                messages: {
                    orderBy:{
                        createdAt: "asc",
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return NextResponse.json(conversations);
    } catch (error){
        console.error("Error Message: ",error)
        return NextResponse.json(
        {
            message: "failed to load messages",
        },
        { status: 500 }
    );
    }
}