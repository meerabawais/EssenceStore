"use client";

export default function ProductsTable({
  products,
  editProduct,
  deleteProduct,
}) {
  function getImageUrl(path) {
    if (!path) return "";

    if (path.startsWith("http")) {
      return path;
    }

    return `/admin${path}`;
  }

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const variant = product.variants?.[0];

              return (
                <tr key={product.id}>
                  <td width="90">
                    {variant?.image1 ? (
                      <img
                        src={getImageUrl(variant.image1)}
                        alt={product.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 8,
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </td>

                  <td>
                    <strong>{product.name}</strong>
                  </td>

                  <td>{product.category?.name}</td>

                  <td>{product.subCategory?.name}</td>

                  <td>{product.brand}</td>

                  <td>
                    £{variant?.price?.toFixed(2)}
                  </td>

                  <td>{variant?.stock}</td>

                  <td>
                    <span
                      className={`badge ${
                        product.status
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {product.status
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}