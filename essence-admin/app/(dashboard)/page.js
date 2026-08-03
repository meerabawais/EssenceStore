"use client";

import { useRouter } from "next/navigation";

export default function AdminLandingPage() {
  const router = useRouter();

  return (
    <div className="container-fluid p-4">

      {/* Header */}
      <div className="mb-4">
        <p className="text-muted mb-1">WELCOME BACK</p>
        <h1 className="fw-bold">Admin Dashboard</h1>
        <p className="text-muted">
          Manage your Essence Store from one place.
        </p>
      </div>

      {/* Main Cards */}
      <div className="row g-4">

        {/* Products */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">Products</h5>
              <p className="text-muted">
                Add, edit and manage your store products.
              </p>

              <button
                className="btn btn-dark"
                onClick={() => router.push("/Products")}
              >
                Manage Products
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">Categories</h5>
              <p className="text-muted">
                Manage categories and subcategories.
              </p>

              <button
                className="btn btn-dark"
                onClick={() => router.push("/Categories")}
              >
                Manage Categories
              </button>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">Orders</h5>
              <p className="text-muted">
                View and manage customer orders.
              </p>

              <button
                className="btn btn-dark"
                onClick={() => router.push("/Orders")}
              >
                View Orders
              </button>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">Users</h5>
              <p className="text-muted">
                Manage registered customers and admins.
              </p>

              <button
                className="btn btn-dark"
                onClick={() => router.push("/Users")}
              >
                Manage Users
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-body p-4">

          <h4 className="fw-bold mb-3">
            Quick Actions
          </h4>

          <div className="d-flex gap-3 flex-wrap">

            <button
              className="btn btn-dark"
              onClick={() => router.push("/Products")}
            >
              + Add Product
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => router.push("/Categories")}
            >
              Manage Categories
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => router.push("/Orders")}
            >
              View Orders
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}