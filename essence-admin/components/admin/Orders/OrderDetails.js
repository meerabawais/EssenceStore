"use client";

import { useRouter } from "next/navigation";
import "./OrderDetails.css";

export default function OrderDetails({ order }) {
  const router = useRouter();

  const subtotal = order.subtotal || 0;
  const tax = order.tax || 0;
  const gst = order.gst || 0;
  const total = order.total || 0;

  return (
    <div className="order-details-page">

      {/* Header */}
      <div className="order-header">

        <div>
          <div className="breadcrumb">
            SHOP <span>·</span> ORDERS
          </div>

          <div className="order-title">
            <h1>Order #{order.id}</h1>

            <span
              className={`order-status ${order.status.toLowerCase()}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="order-actions">

          <button
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            Print
          </button>

          <button className="btn btn-outline">
            Send Invoice
          </button>

          <button className="btn btn-primary">
            Mark Fulfilled
          </button>

        </div>

      </div>


      {/* Order Progress */}
      <div className="order-progress">

        <div className="progress-line"></div>

        <ProgressStep
          title="Placed"
          active
        />

        <ProgressStep
          title="Processing"
          active={
            order.status === "PROCESSING" ||
            order.status === "SHIPPED" ||
            order.status === "DELIVERED"
          }
        />

        <ProgressStep
          title="Shipped"
          active={
            order.status === "SHIPPED" ||
            order.status === "DELIVERED"
          }
        />

        <ProgressStep
          title="Delivered"
          active={
            order.status === "DELIVERED"
          }
        />

      </div>


      {/* Main Content */}
      <div className="order-layout">

        {/* Left Column */}
        <div className="order-left">

          {/* Order Items */}
          <div className="order-card">

            <div className="card-header">
              <h3>
                Items · {order.items.length}
              </h3>
            </div>

            <div className="order-table">

              <div className="table-header">
                <span>PRODUCT</span>
                <span>QTY</span>
                <span>PRICE</span>
                <span>TOTAL</span>
              </div>

             {order.items.map((item) => (

  <div
    className="order-item"
    key={item.id}
  >

    {/* Product */}
    <div className="d-flex align-items-center gap-3">

      <img
        src={`/admin${item.productImage}`}
        alt={item.productName}
        width={70}
        height={70}
        style={{
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div>

        <strong>
          {item.productName}
        </strong>

        <small>
          {item.size && `Size: ${item.size}`}
          {item.color && ` • Color: ${item.color}`}
        </small>

      </div>

    </div>

    {/* Quantity */}
    <span>
      {item.quantity}
    </span>

    {/* Price */}
    <span>
      £{item.price.toFixed(2)}
    </span>

    {/* Total */}
    <span>
      £{item.total.toFixed(2)}
    </span>

  </div>

))}
            </div>


            {/* Summary */}
            <div className="order-summary">

              <div>
                <span>Subtotal</span>
                <strong>
                  £{subtotal.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Tax</span>
                <strong>
                  £{tax.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>GST</span>
                <strong>
                  £{gst.toFixed(2)}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  £{total.toFixed(2)}
                </strong>
              </div>

            </div>

          </div>


          {/* Order Notes */}
          <div className="order-card">

            <div className="card-header">
              <h3>Order Notes</h3>
            </div>

            <div className="card-content">
              <p>
                No notes have been added to this order.
              </p>
            </div>

          </div>

        </div>


        {/* Right Column */}
        <div className="order-right">

          {/* Customer */}
          <div className="order-card">

            <div className="card-header">
              <h3>Customer</h3>
            </div>

            <div className="customer-content">

              <div className="customer-avatar">
                {order.firstName?.charAt(0)}
                {order.lastName?.charAt(0)}
              </div>

              <div>
                <h4>
                  {order.firstName} {order.lastName}
                </h4>

                <p>
                  Customer
                </p>
              </div>

            </div>

            <div className="customer-info">

              <div>
                <span>Email</span>
                <strong>
                  {order.email}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {order.phone}
                </strong>
              </div>

            </div>

          </div>


          {/* Shipping Address */}
          <div className="order-card">

            <div className="card-header">
              <h3>Shipping Address</h3>
            </div>

            <div className="address-content">

              <strong>
                {order.firstName} {order.lastName}
              </strong>

              <p>
                {order.streetAddress}
                <br />

                {order.city}, {order.state}
                <br />

                {order.zipCode}
                <br />

                {order.country}
              </p>

            </div>

          </div>


          {/* Payment */}
          <div className="order-card">

            <div className="card-header">
              <h3>Payment</h3>
            </div>

            <div className="payment-content">

              <span>Method</span>

              <strong>
                {order.paymentMethod.replaceAll(
                  "_",
                  " "
                )}
              </strong>

            </div>

            <div className="payment-content">

              <span>Payment Status</span>

              <strong className="paid">
                {order.status === "CANCELLED"
                  ? "Cancelled"
                  : "Paid"}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


function ProgressStep({ title, active }) {
  return (
    <div
      className={`progress-step ${
        active ? "active" : ""
      }`}
    >

      <div className="progress-circle">
        {active ? "✓" : ""}
      </div>

      <strong>
        {title}
      </strong>

      <small>
        {active ? "Completed" : "Pending"}
      </small>

    </div>
  );
}