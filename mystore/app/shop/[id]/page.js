import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      variants: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="single_product_details_area section-padding-100 clearfix">
      <div className="container m-2">
        <ProductDetails product={product} />
      </div>
    </section>
  );
}