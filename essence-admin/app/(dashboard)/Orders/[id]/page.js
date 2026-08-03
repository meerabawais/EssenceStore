import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OrderDetails from "@/components/admin/Orders/OrderDetails";

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
  where: {
    id: Number(id),
  },
  include: {
    items: true,
  },
});

  if (!order) {
    notFound();
  }

  return <OrderDetails order={order} />;
}