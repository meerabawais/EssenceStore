import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {

    const { id } = await params;

    const contactId = Number(id);

    await prisma.contactMessage.updateMany({

        where: {

            contactId: contactId,

            sender: "CUSTOMER",

            isRead: false,

        },

        data: {

            isRead: true,

        },

    });

    return NextResponse.json({

        success: true,

    });

}