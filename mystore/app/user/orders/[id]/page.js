import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function UserOrderDetailPage({ params }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect(`/account/login?next=/user/orders/${id}`);

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { items: true },
  });

  if (!order || order.email !== user.email) {
    notFound();
  }

  return (
    <div>
      <h4>Order #{order.id}</h4>
      <p>
        Placed on {new Date(order.createdAt).toLocaleDateString()} &mdash; Status:{" "}
        <strong>{order.status}</strong>
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Variant</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{[item.size, item.color].filter(Boolean).join(" / ") || "-"}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row justify-content-end">
        <div className="col-md-4">
          <table className="table">
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Tax</th>
                <td>${order.tax.toFixed(2)}</td>
              </tr>
              <tr>
                <th>GST</th>
                <td>${order.gst.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h5>Shipping Address</h5>
      <p>
        {order.firstName} {order.lastName}
        <br />
        {order.streetAddress}, {order.city}, {order.state} {order.zipCode}
        <br />
        {order.country}
        <br />
        {order.phone}
      </p>
    </div>
  );
}
