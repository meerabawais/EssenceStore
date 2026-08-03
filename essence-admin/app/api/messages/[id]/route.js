import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;

        const contactId = Number(id);

        if (!contactId || Number.isNaN(contactId)) {
            return NextResponse.json(
                { message: "Invalid conversation ID" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const data = {};

        if (typeof body.isStarred === "boolean") {
            data.isStarred = body.isStarred;
        }

        if (typeof body.isTrashed === "boolean") {
            data.isTrashed = body.isTrashed;
        }

        const updatedConversation = await prisma.contactInfo.update({
            where: {
                id: contactId,
            },
            data,
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            conversation: updatedConversation,
        });

    } catch (error) {

        console.error("UPDATE MESSAGE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update conversation",
            },
            {
                status: 500,
            }
        );
    }
}