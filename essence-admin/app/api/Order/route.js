import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * pageSize;

    const where =
      search.trim() === ""
        ? {}
        : {
            OR: [
                 ...(isNaN(Number(search))
                      ? []
                      : [{ id: Number(search) }]),

              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          };

    const totalOrders = await prisma.order.count({
      where,
    });

    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });

    return NextResponse.json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / pageSize),
      currentPage: page,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}