import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const categories = await prisma.category.findMany({

        include: {
            subCategories: true,
        },

        orderBy: {
            createdAt: "desc",
        },

    });

    return NextResponse.json(categories);

}

export async function POST(request) {

    try {

        const body = await request.json();

        const category = await prisma.category.create({

            data: {

                name: body.name,

                status: body.status,

            },

            include: {

                subCategories: true,

            },

        });

        return NextResponse.json(category);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }

}