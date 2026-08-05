import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function saveImage(file) {
  if (!file || typeof file === "string" || file.size === 0) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName =file.name;

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

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const categoryId = Number(formData.get("categoryId"));
    const subCategoryId = Number(formData.get("subCategoryId"));

    const brand = formData.get("brand");
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status") === "true";

    // Product update
    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        categoryId,
        subCategoryId,
        brand,
        name,
        description,
        status,
      },
    });

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
    id: formData.get(`variants[${index}][id]`),

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
console.log("Variants received:", variants);
const submittedVariantIds = variants
  .filter((v) => v.id)
  .map((v) => Number(v.id));
  console.log("Submitted IDs:", submittedVariantIds);

  const existingVariants = await prisma.variant.findMany({
  where: {
    productId: Number(id),
  },
});

console.log("Existing variants:", existingVariants.map(v => v.id));
if (submittedVariantIds.length > 0) {
  await prisma.variant.deleteMany({
    where: {
      productId: Number(id),
      id: {
        notIn: submittedVariantIds,
      },
    },
  });
} else {
  await prisma.variant.deleteMany({
    where: {
      productId: Number(id),
    },
  });
  console.log("Deleted variants:", deleted);
}
for (const variant of variants) {

  if (variant.id) {

    await prisma.variant.update({
      where: {
        id: Number(variant.id),
      },

      data: {

        size: variant.size,

        color: variant.color,

        price: variant.price,

        stock: variant.stock,

        discountValue: variant.discountValue,

        discountType: variant.discountType,

        image1: variant.image1,

        image2: variant.image2,
      },
    });

  } else {

    await prisma.variant.create({

      data: {

        productId: Number(id),

        size: variant.size,

        color: variant.color,

        price: variant.price,

        stock: variant.stock,

        discountValue: variant.discountValue,

        discountType: variant.discountType,

        image1: variant.image1,

        image2: variant.image2,
      },
    });

  }

}

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
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

export async function DELETE(request, { params }) {
  const { id } = await params;

  await prisma.variant.deleteMany({
    where: {
      productId: Number(id),
    },
  });

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Deleted",
  });
}