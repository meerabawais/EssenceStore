import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET (request, {params}){
    const{id} = await params;
    const order = await prisma.order.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            items: true,
        },
    });
    return NextResponse.json(order);
}
export async function PUT(request, { params }) {

    try {

        const { id: orderId } = await params;

        const body = await request.json();

        const {
            items = [],
            id,
            createdAt,
            ...data
        } = body;

        const updated = await prisma.order.update({

            where: {
                id: Number(orderId),
            },

            data: {

                ...data,

                products: items,

                items: {

                    deleteMany: {},

                    create: items.map(item => ({

                        productId: Number(item.productId),
                        variantId: Number(item.variantId),

                        productName: item.productName,

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

        return NextResponse.json(updated);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }

}

export async function DELETE(request, { params }) {

    const { id } = await params;

    await prisma.orderItem.deleteMany({
        where: {
            orderId: Number(id),
        },
    });

    await prisma.order.delete({
        where: {
            id: Number(id),
        },
    });

    return NextResponse.json({
        message: "Deleted",
    });

}