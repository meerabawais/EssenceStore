import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(request, { params }) {

    const user = await getSessionUser();

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const order = await prisma.order.findFirst({

        where: {
            id: Number(params.id),
            userId: user.id,
        },

        include: {
            items: true,
        },

    });

    if (!order) {

        return NextResponse.json(
            { error: "Order not found" },
            { status: 404 }
        );

    }

    return NextResponse.json(order);
}