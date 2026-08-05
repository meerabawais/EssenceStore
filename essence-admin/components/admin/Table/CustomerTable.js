"use client";

import { useEffect, useState } from "react";
import "./CustomerTable.css";

export default function CustomerTable() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalOrders, setTotalOrders] = useState(0);
const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 10;

  useEffect(() => {
  load(page, searchQuery);
}, [page, searchQuery]);

  async function load(pageNumber = 1, searchText = "") {
    try {
      setLoading(true);

      const res = await fetch(
        `/admin/api/Order?page=${pageNumber}&pageSize=${pageSize}&search=${encodeURIComponent(
          searchText
        )}`
      );

      const data = await res.json();

      setOrders(data.orders || []);

      setTotalPages(data.totalPages || 1);

      setTotalOrders(data.totalOrders || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
  setSearch(e.target.value);
}

  if (loading) {
    return (
      <div className="table-message">
        Loading customers...
      </div>
    );
  }

  const startEntry =
    totalOrders === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endEntry = Math.min(
    page * pageSize,
    totalOrders
  );

  return (
    <div className="customer-table-container">

      {/* TOP CONTROLS */}

      <div className="table-controls">

        <div className="entries-control">
          <span>
            Showing {pageSize} entries per page
          </span>
        </div>

       <div className="search-control">

  <label>Search:</label>

  <input
    type="text"
    value={search}
    placeholder="Search customers..."
    onChange={handleSearch}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        setPage(1);
        setSearchQuery(search);
      }
    }}
  />

  <button
    onClick={() => {
      setPage(1);
      setSearchQuery(search);
    }}
  >
    Search
  </button>

</div>

      </div>

      {/* TABLE */}

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {orders.length > 0 ? (

              orders.map((order) => (

                <tr key={order.id}>

                  <td>{order.id}</td>

                  <td>
                    {order.firstName} {order.lastName}
                  </td>

                  <td>{order.email}</td>

                  <td>{order.phone}</td>

                  <td>
                    £{Number(order.total || 0).toFixed(2)}
                  </td>

                  <td>
                    {order.paymentMethod?.replaceAll("_", " ")}
                  </td>

                  <td>

                    <span
                      className={`status ${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="no-results"
                >
                  No customers found
                </td>

              </tr>

            )}

          </tbody>

          <tfoot>

            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </tfoot>

        </table>

      </div>

      {/* FOOTER */}

      <div className="table-footer">

        <div className="entries-info">

          {totalOrders === 0 ? (
            "Showing 0 to 0 of 0 entries"
          ) : (
            <>
              Showing {startEntry} to {endEntry} of{" "}
              {totalOrders} entries
            </>
          )}

        </div>

        <div className="pagination">

          {/* First */}

          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            «
          </button>

          {/* Previous */}

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {/* Pages */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (

            <button
              key={pageNumber}
              className={
                page === pageNumber
                  ? "active"
                  : ""
              }
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>

          ))}

          {/* Next */}

          <button
            disabled={
              page === totalPages ||
              totalPages === 0
            }
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>

          {/* Last */}

          <button
            disabled={
              page === totalPages ||
              totalPages === 0
            }
            onClick={() => setPage(totalPages)}
          >
            »
          </button>

        </div>

      </div>

    </div>
  );
}