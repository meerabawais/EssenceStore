import { prisma } from "@/lib/prisma";
import ProductCard from "../Home/ProductCard";

export default async function ProductGrid({
  search = "",
  categoryId,
  subCategoryId,
}) {
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
      variants: {
        where: {
          status: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="row">
      {products.length === 0 ? (
        <div className="col-12">
          <p>No products found.</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      )}
    </div>
  );
}