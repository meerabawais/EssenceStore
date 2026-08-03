"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrdersTable({
  orders,
  editOrder,
  deleteOrder,
  createOrder,
}) {

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    const customerName =
      `${order.firstName || ""} ${order.lastName || ""}`.toLowerCase();

    const orderId =
      String(order.id).toLowerCase();

    const status =
      order.status?.toLowerCase() || "";

    const payment =
      order.paymentMethod
        ?.replaceAll("_", " ")
        .toLowerCase() || "";

    const email =
      order.email?.toLowerCase() || "";

    const phone =
      order.phone?.toLowerCase() || "";

    return (
      customerName.includes(searchValue) ||
      orderId.includes(searchValue) ||
      status.includes(searchValue) ||
      payment.includes(searchValue) ||
      email.includes(searchValue) ||
      phone.includes(searchValue)
    );
  });
  const totalEntries = filteredOrders.length;

  const totalPages = Math.ceil(
    totalEntries / entriesPerPage
  );

  const startIndex =
    (currentPage - 1) * entriesPerPage;

  const endIndex =
    startIndex + entriesPerPage;

  const currentOrders =
    filteredOrders.slice(
      startIndex,
      endIndex
    );

  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }
  function handleEntriesChange(e) {
    setEntriesPerPage(
      Number(e.target.value)
    );
    setCurrentPage(1);
  }


  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="card shadow-sm mt-4">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h3>All Orders</h3>

          <button
            className="btn btn-success"
            onClick={createOrder}
          >
            + New Order
          </button>

        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">


          <div className="d-flex align-items-center gap-2">

            <select
              className="form-select"
              style={{ width: "80px" }}
              value={entriesPerPage}
              onChange={handleEntriesChange}
            >

              <option value={4}>4</option>
              <option value={12}>12</option>
              <option value={50}>50</option>
              <option value={100}>100</option>

            </select>

            <span>
              entries per page
            </span>

          </div>


          <div className="d-flex align-items-center gap-2">

            <label>
              Search:
            </label>

            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handleSearch}
              style={{ width: "220px" }}
              placeholder="Search orders..."
            />

          </div>

        </div>


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

              {currentOrders.length > 0 ? (

                currentOrders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>


                    <td>
                      {order.firstName}{" "}
                      {order.lastName}
                    </td>


                    <td>
                      {order.items
                        ? order.items.length
                        : 0}
                    </td>

                    <td>
                      $
                      {Number(
                        order.total || 0
                      ).toFixed(2)}
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
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>


                    <td>


                      <Link
                        href={`/Orders/${order.id}`}
                        className="btn btn-sm btn-outline-dark me-2"
                      >
                        View Details
                      </Link>


                      <Link
                        href={`/Invoice/${order.id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        Invoice
                      </Link>


                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          editOrder(order)
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          deleteOrder(order.id)
                        }
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
                    No orders found
                  </td>

                </tr>

              )}

            </tbody>


            <tfoot>

              <tr>

                <th>ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>

              </tr>

            </tfoot>

          </table>

        </div>


        <div className="d-flex justify-content-between align-items-center mt-3">


          <div>

            {totalEntries === 0 ? (

              "Showing 0 to 0 of 0 entries"

            ) : (

              <>
                Showing{" "}
                {startIndex + 1} to{" "}
                {Math.min(
                  endIndex,
                  totalEntries
                )}{" "}
                of{" "}
                {totalEntries} entries
              </>

            )}

          </div>

          <div className="d-flex gap-1">

            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(1)
              }
            >
              «
            </button>

            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              ‹
            </button>


            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                className={`btn btn-sm ${
                  currentPage === page
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>

            ))}


            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              ›
            </button>



            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  totalPages
                )
              }
            >
              »
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}