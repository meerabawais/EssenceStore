import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const allOrders = await prisma.order.findMany({
        include: {
            items: true,
        },
    });
    const recentOrders = await prisma.order.findMany({
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
    const totalRevenue = allOrders.reduce(
        (sum, order) => sum + order.total,
        0
    );

    const totalOrders = allOrders.length;

    const averageOrderValue =
        totalOrders > 0
            ? totalRevenue / totalOrders
            : 0;

    const pendingOrders = allOrders.filter(
        order => order.status === "PENDING"
    ).length;

    const monthlyRevenue = Array(12).fill(0);

allOrders.forEach((order) => {

    const month = new Date(order.createdAt).getMonth();

    monthlyRevenue[month] += order.total;

});
    return NextResponse.json({

        totalRevenue,

        totalOrders,

        averageOrderValue,
        allOrders,
        pendingOrders,
        monthlyRevenue,
        recentOrders,
        lowStockProducts,  
    });

}