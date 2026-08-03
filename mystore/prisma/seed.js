import { PrismaClient, DiscountType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin@123", 10);
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const women = await prisma.category.create({
    data: {
      name: "Women",
    },
  });
  const men = await prisma.category.create({
    data:{
      name: "Men",
    },
  });
  const kids = await prisma.category.create({
  data: {
    name: "Kids",
  },
});

  const dresses = await prisma.subCategory.create({
    data: {
      name: "Dresses",
      categoryId: women.id,
    },
  });
  await prisma.subCategory.create({
  data: { name: "Blouses & Shirts", categoryId: women.id },
});

await prisma.subCategory.create({
  data: { name: "T-Shirts", categoryId: women.id },
});

await prisma.subCategory.create({
  data: { name: "Rompers", categoryId: women.id },
});

await prisma.subCategory.create({
  data: { name: "Hats", categoryId: women.id },
});
await prisma.subCategory.create({
  data: { name: "T-Shirts", categoryId: men.id },
});

await prisma.subCategory.create({
  data: { name: "Polo", categoryId: men.id },
});

await prisma.subCategory.create({
  data: { name: "Shirts", categoryId: men.id },
});

await prisma.subCategory.create({
  data: { name: "Jackets", categoryId: men.id },
});

await prisma.subCategory.create({
  data: { name: "Trench", categoryId: men.id },
});
await prisma.subCategory.create({
  data: { name: "Dresses", categoryId: kids.id },
});

await prisma.subCategory.create({
  data: { name: "Shirts", categoryId: kids.id },
});

await prisma.subCategory.create({
  data: { name: "T-Shirts", categoryId: kids.id },
});

await prisma.subCategory.create({
  data: { name: "Jackets", categoryId: kids.id },
});

await prisma.subCategory.create({
  data: { name: "Trench", categoryId: kids.id },
});
await prisma.user.create({
  data:{
    name:"Administrator",
    email:"admin@essence.com",
    password: hashedPassword,
    role:"ADMIN",
  }
})

  for (const item of products) {

    const product = await prisma.product.create({
      data: {
        brand: item.brand,
        name: item.name,
        description: item.description || "",

        categoryId: women.id,
        subCategoryId: dresses.id,
      },
    });

    await prisma.variant.create({
      data: {

        productId: product.id,

        size: "M",
        color: "Black",

        price: item.price,

        stock: 20,

        image1: item.images[0],
        image2: item.images[1] ?? null,

        discountValue: item.oldPrice
          ? item.oldPrice - item.price
          : null,

        discountType: item.oldPrice
          ? DiscountType.FIXED
          : null,
      },
    });

  }

  console.log("Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });