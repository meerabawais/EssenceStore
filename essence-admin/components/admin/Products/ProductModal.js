"use client";

import { useState, useEffect } from "react";

export default function ProductModal({ product, categories, onClose, onSave }) {
  const [formData, setFormData] = useState(product);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setFormData(product);
  }, [product]);
  useEffect(() => {
  async function loadImages() {
    const res = await fetch("/admin/api/Images");
    const data = await res.json();
    setImages(data);
  }

  loadImages();
}, []);

  if (!formData) return null;

  const selectedCategory = categories.find(
    (c) => c.id === Number(formData.categoryId),
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.55)",
      }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formData.id ? "Edit Product" : "Add Product"}
            </h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row">
              {/* CATEGORY */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>

                <select
                  className="form-select"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBCATEGORY */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Subcategory</label>

                <select
                  className="form-select"
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={handleChange}
                >
                  <option value="">Select Subcategory</option>

                  {selectedCategory?.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BRAND */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>

                <input
                  className="form-control"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>

              {/* PRODUCT NAME */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Product Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* DESCRIPTION */}

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            <h5 className="mb-3">Product Variant</h5>
            <div className="row">
              {/* Size */}

              <div className="col-md-3 mb-3">
                <label className="form-label">Size</label>

                <input
                  className="form-control"
                  value={formData.variant.size ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        size: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              {/* Color */}

              <div className="col-md-3 mb-3">
                <label className="form-label">Color</label>

                <input
                  className="form-control"
                  value={formData.variant.color ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        color: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              {/* Price */}

              <div className="col-md-3 mb-3">
                <label className="form-label">Price</label>

                <input
                  type="string"
                  className="form-control"
                  value={formData.variant.price ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        price: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>

              {/* Stock */}

              <div className="col-md-3 mb-3">
                <label className="form-label">Stock</label>

                <input
                  type="number"
                  className="form-control"
                  value={formData.variant.stock ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        stock: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="row">
              {/* Discount */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Discount Value</label>

                <input
                  type="string"
                  className="form-control"
                  value={formData.variant.discountValue ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        discountValue: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>

              {/* Discount Type */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Discount Type</label>

                <select
                  className="form-select"
                  value={formData.variant.discountType ?? "FIXED"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      variant: {
                        ...prev.variant,

                        discountType: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="FIXED">Fixed</option>

                  <option value="PERCENTAGE">Percentage</option>
                </select>
              </div>
            </div>

            <div className="row">
              {/* Image1 */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Image 1</label>

               <select
  className="form-select"
  value={formData.variant.image1 ?? ""}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      variant: {
        ...prev.variant,
        image1: e.target.value,
      },
    }))
  }
>
  <option value="">Select Image</option>

  {images.map((image) => (
    <option
      key={image.path}
      value={image.path}
    >
      {image.name}
    </option>
  ))}
</select>
              </div>

              {/* Image2 */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Image 2</label>

               <select
  className="form-select"
  value={formData.variant.image2 ?? ""}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      variant: {
        ...prev.variant,
        image2: e.target.value,
      },
    }))
  }
>
  <option value="">Select Image</option>

  {images.map((image) => (
    <option
      key={image.path}
      value={image.path}
    >
      {image.name}
    </option>
  ))}
</select>
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,

                    status: e.target.checked,
                  }))
                }
              />

              <label className="form-check-label">Active Product</label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-success"
              onClick={() => onSave(formData)}
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
