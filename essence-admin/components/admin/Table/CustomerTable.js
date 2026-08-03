"use client";

import { useEffect, useState } from "react";
import "./CustomerTable.css";

export default function CustomerTable() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [entriesPerPage, setEntriesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/admin/api/Order");
        const data = await res.json();

        setOrders(data);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  
  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    const name =
      `${order.firstName || ""} ${order.lastName || ""}`.toLowerCase();

    const email =
      order.email?.toLowerCase() || "";

    const phone =
      order.phone?.toLowerCase() || "";

    const id =
      String(order.id).toLowerCase();

    const payment =
      order.paymentMethod
        ?.replaceAll("_", " ")
        .toLowerCase() || "";

    const status =
      order.status?.toLowerCase() || "";

    return (
      name.includes(searchValue) ||
      email.includes(searchValue) ||
      phone.includes(searchValue) ||
      id.includes(searchValue) ||
      payment.includes(searchValue) ||
      status.includes(searchValue)
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

 const currentOrders = filteredOrders.slice(
  startIndex,
  startIndex + Number(entriesPerPage)
);

console.log("Entries per page:", entriesPerPage);
console.log("Filtered:", filteredOrders.length);
console.log("Current:", currentOrders.length);

  // Reset page when search changes
  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  // Change entries per page
  function handleEntriesChange(e) {
    setEntriesPerPage(
      Number(e.target.value)
    );

    setCurrentPage(1);
  }


  if (loading) {
    return (
      <div className="table-message">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="customer-table-container">

      {/* TOP CONTROLS */}

      <div className="table-controls">

        {/* Entries per page */}

        <div className="entries-control">

          <select
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


        {/* Search */}

        <div className="search-control">

          <label>
            Search:
          </label>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
          />

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

            {currentOrders.length > 0 ? (

              currentOrders.map((order) => (

                <tr key={order.id}>

                  <td>
                    {order.id}
                  </td>

                  <td>
                    {order.firstName}{" "}
                    {order.lastName}
                  </td>

                  <td>
                    {order.email}
                  </td>

                  <td>
                    {order.phone}
                  </td>

                  <td>
                    £
                    {Number(
                      order.total || 0
                    ).toFixed(2)}
                  </td>

                  <td>
                    {order.paymentMethod
                      ?.replaceAll(
                        "_",
                        " "
                      )}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        order.status?.toLowerCase()
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
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


          {/* BOTTOM HEADER */}

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


      {/* BOTTOM PAGINATION */}

      <div className="table-footer">

        {/* Showing text */}

        <div className="entries-info">

          {totalEntries === 0 ? (
            "Showing 0 to 0 of 0 entries"
          ) : (
            <>
              Showing{" "}
              {startIndex + 1} to{" "}
              {Math.min(
                endIndex,
                totalEntries
              )} of{" "}
              {totalEntries} entries
            </>
          )}

        </div>


        {/* Pagination */}

        <div className="pagination">

          {/* First */}

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(1)
            }
          >
            «
          </button>


          {/* Previous */}

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            ‹
          </button>


          {/* Page Numbers */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (

            <button
              key={page}
              className={
                currentPage === page
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}


          {/* Next */}

          <button
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


          {/* Last */}

          <button
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
  );
}