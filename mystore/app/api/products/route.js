import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("category");
    const subCategoryId = searchParams.get("subcategory");
    const search = searchParams.get("search") || "";

    const where = {};

    if (categoryId) {
      where.categoryId = Number(categoryId);
    }

    if (subCategoryId) {
      where.subCategoryId = Number(subCategoryId);
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          variants: {
            some: {
              OR: [
                {
                  color: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  size: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where,

      include: {
        category: true,
        subCategory: true,
        variants: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}