import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function UserOrdersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/account/login?next=/user/orders");

  const orders = await prisma.order.findMany({
    where: { email: user.email },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div>
        <h4>My Orders</h4>
        <p>You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h4>My Orders</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <Link href={`/user/orders/${order.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
