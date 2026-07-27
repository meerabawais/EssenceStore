import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const orders = await prisma.order.findMany({
        include: {
            items: true
        },
        orderBy: {
        createdAt: "desc",
        },
        take: 5,
    });

    const products = await prisma.product.findMany({
        include: {
            variants: true
        }
    });
    const lowStockProducts = await prisma.variant.findMany({
    where: {
        stock: {
            lte: 5,
        },
    },
     include: {
        product: true,
    },
});
    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.total,
        0
    );

    const totalOrders = orders.length;

    const averageOrderValue =
        totalOrders > 0
            ? totalRevenue / totalOrders
            : 0;

    const pendingOrders = orders.filter(
        order => order.status === "PENDING"
    ).length;

    const monthlyRevenue = Array(12).fill(0);

orders.forEach((order) => {

    const month = new Date(order.createdAt).getMonth();

    monthlyRevenue[month] += order.total;

});
    return NextResponse.json({

        totalRevenue,

        totalOrders,

        averageOrderValue,

        pendingOrders,
        monthlyRevenue,
        recentOrders: orders,
        lowStockProducts,  
    });

}