import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";

export default async function MyOrdersPage() {
  const user = await getSessionUser();

  if (!user) {
    return <p>Please login to view your orders.</p>;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container py-5">

      <h2 className="mb-4 fw-bold">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="alert alert-light border">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-lg-6" key={order.id}>

              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderRadius: 15 }}
              >
                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>
                      <h5 className="fw-bold">
                        Order #{order.id}
                      </h5>

                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>

                    <StatusBadge status={order.status} />

                  </div>

                  <hr />

                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>

                  <p>
                    <strong>Items:</strong> {order.items.length}
                  </p>

                  <Link
                    href={`/my-orders/${order.id}`}
                    className="btn essence-btn mt-2"
                  >
                    View Details
                  </Link>

                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    PENDING: "warning",
    CONFIRMED: "info",
    PACKED: "secondary",
    SHIPPED: "primary",
    DELIVERED: "success",
    CANCELLED: "danger",
  };

  return (
    <span className={`badge bg-${colors[status]}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}