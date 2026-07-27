"use client";
export default function CategoriesTable({
  categories,
  editCategory,
  deleteCategory,
  editSubCategory,
  deleteSubCategory,
}) {
  return (
    <div className="card categories-card mt-4">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Category</th>
              <th>Subcategories</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <strong>{category.name}</strong>
                </td>

                <td>
                  {category.subCategories.length > 0 ? (
                    category.subCategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="d-flex align-items-center mb-2"
                      >
                        <span className="badge bg-secondary me-2">
                          {sub.name}
                        </span>

                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => editSubCategory(sub)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteSubCategory(sub.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted">No Subcategories</span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      category.status ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {category.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
