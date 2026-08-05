import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

async function saveImage(file) {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName =
    file.name;

  const filePath = path.join(
    process.cwd(),
    "public",
    "img",
    "product-img",
    fileName
  );

  await fs.writeFile(filePath, buffer);

  return `/img/product-img/${fileName}`;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
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
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const categoryId = Number(formData.get("categoryId"));
    const subCategoryId = Number(formData.get("subCategoryId"));

    const brand = formData.get("brand");
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");

    const variants = [];

let index = 0;

while (formData.has(`variants[${index}][size]`)) {

    const image1File = formData.get(
        `variants[${index}][image1]`
    );

    const image2File = formData.get(
        `variants[${index}][image2]`
    );

    const existingImage1 = formData.get(
        `variants[${index}][existingImage1]`
    );

    const existingImage2 = formData.get(
        `variants[${index}][existingImage2]`
    );

    const image1 =
        image1File instanceof File && image1File.size > 0
            ? await saveImage(image1File)
            : existingImage1;

    const image2 =
        image2File instanceof File && image2File.size > 0
            ? await saveImage(image2File)
            : existingImage2;

    variants.push({

        size: formData.get(
            `variants[${index}][size]`
        ),

        color: formData.get(
            `variants[${index}][color]`
        ),

        price: Number(
            formData.get(
                `variants[${index}][price]`
            )
        ),

        stock: Number(
            formData.get(
                `variants[${index}][stock]`
            )
        ),

        discountValue: Number(
            formData.get(
                `variants[${index}][discountValue]`
            )
        ),

        discountType: formData.get(
            `variants[${index}][discountType]`
        ),

        image1,

        image2,

    });

    index++;

}

    const product = await prisma.product.create({
      data: {
        categoryId,
        subCategoryId,
        brand,
        name,
        description,
        status: status === "true",

       variants: {
    create: variants,
},
      },

      include: {
        category: true,
        subCategory: true,
        variants: true,
      },
    });

    return NextResponse.json(product);
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