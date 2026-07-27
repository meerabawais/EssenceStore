import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
export async function GET() {
    const [
        products,
        categories,
        subCategories,
        orders,
    ] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.subCategory.count(),
        prisma.order.count(),
    ]);
    return NextResponse.json({
        products,
        categories,
        subCategories,
        orders,
    });
}