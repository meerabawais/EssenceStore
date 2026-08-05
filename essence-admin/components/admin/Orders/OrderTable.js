"use client";

import Link from "next/link";
import { useState } from "react";

export default function OrdersTable({
  orders,
  page,
  setPage,
  totalPages,
  totalOrders,
  editOrder,
  deleteOrder,
  createOrder,
   search,
    setSearch,
}) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>All Orders</h3>

          <button
            className="btn btn-success"
            onClick={createOrder}
          >
            + New Order
          </button>
        </div>

        {/* Search */}

        <div className="d-flex justify-content-end mb-3">
          <div className="d-flex align-items-center gap-2">

            <label>Search:</label>

            <input
              className="form-control"
              placeholder="Search Orders..."
              style={{ width: "250px" }}
              value={search}
    onChange={(e)=>{
        setPage(1);
        setSearch(e.target.value);
    }}
            />

          </div>
        </div>

        {/* Table */}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>

              <tr>

                <th>ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {orders.length > 0 ? (

                orders.map((order) => (

                  <tr key={order.id}>

                    <td>#{order.id}</td>

                    <td>
                      {order.firstName} {order.lastName}
                    </td>

                    <td>{order.items?.length ?? 0}</td>

                    <td>
                      ${Number(order.total).toFixed(2)}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          order.status === "PENDING"
                            ? "bg-warning"
                            : order.status === "PROCESSING"
                            ? "bg-info"
                            : order.status === "SHIPPED"
                            ? "bg-primary"
                            : order.status === "DELIVERED"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <Link
                        href={`/Orders/${order.id}`}
                        className="btn btn-sm btn-outline-dark me-2"
                      >
                        View
                      </Link>

                      <Link
                        href={`/Invoice/${order.id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        Invoice
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => editOrder(order)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    No Orders Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="d-flex justify-content-between align-items-center mt-3">

          <div>

            Showing{" "}
            {orders.length === 0
              ? 0
              : (page - 1) * 10 + 1}
            {" "}to{" "}
            {Math.min(page * 10, totalOrders)}
            {" "}of{" "}
            {totalOrders} entries

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span
              className="align-self-center fw-bold"
            >
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}