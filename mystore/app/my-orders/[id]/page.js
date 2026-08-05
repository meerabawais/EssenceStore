import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export default async function OrderDetails({ params }) {
  const { id } = await params;
  const user = await getSessionUser();

  if (!user) {
    return (
      <div className="container py-5">
        <h3>Please login to view your order.</h3>
      </div>
    );
  }

  const order = await prisma.order.findFirst({
  where: {
    id: Number(id),
    userId: user.id,
  },
  include: {
    items: true,
  },
});
  if (!order) {
    notFound();
  }
  return (
    <div className="container py-5">

      <Link
        href="/my-orders"
        className="btn btn-outline-dark mb-4"
      >
        ← Back to My Orders
      </Link>

      <div className="card shadow-sm border-0">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Order #{order.id}</h2>
              <p className="text-muted mb-0">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <StatusBadge status={order.status} />
          </div>

          <hr />

          <h5 className="mb-3">Products</h5>

{order.items.map((item) => (
  <div
    key={item.id}
    className="d-flex align-items-center border-bottom py-3"
  >
    <img
      src={item.productImage || "/img/core-img/no-image.png"}
      alt={item.productName}
      width={90}
      height={90}
      style={{
        width: "90px",
        height: "90px",
        objectFit: "cover",
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    />

    <div className="ms-3 flex-grow-1">
      <h6 className="mb-1">{item.productName}</h6>

      <small className="d-block">
        Size: {item.size || "-"}
      </small>

      <small className="d-block">
        Color: {item.color || "-"}
      </small>

      <small className="d-block">
        Quantity: {item.quantity}
      </small>
    </div>

    <strong>${item.total.toFixed(2)}</strong>
  </div>
))}

          <div className="row mt-5">

            <div className="col-md-6">
              <h5>Shipping Address</h5>

              <p>
                {order.firstName} {order.lastName}
                <br />
                {order.streetAddress}
                <br />
                {order.city}, {order.state}
                <br />
                {order.country}
                <br />
                {order.zipCode}
              </p>
            </div>

            <div className="col-md-6">
              <h5>Order Summary</h5>

              <p>Subtotal: ${order.subtotal}</p>
              <p>GST: ${order.gst}</p>
              <p>Tax: ${order.tax}</p>

              <hr />

              <h5>Total: ${order.total}</h5>
            </div>

          </div>

        </div>
      </div>

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
    <span className={`badge bg-${colors[status] || "dark"}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}