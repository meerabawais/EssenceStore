"use client";

import { useState, useEffect } from "react";

export default function ProductModal({ product, categories, onClose, onSave }) {
  const emptyVariant = {
  size: "",
  color: "",
  price: "",
  stock: 0,
  image1: "",
  image2: "",
  discountValue: "",
  discountType: "FIXED",
};

const [formData, setFormData] = useState({
  ...product,
  variants: [],
});

useEffect(() => {
  setFormData({
    ...product,
    variants:
      product?.variants && product.variants.length > 0
        ? product.variants
        : [emptyVariant],
  });
}, [product]);

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
  function updateVariant(index, field, value) {
  setFormData((prev) => {
    const variants = [...prev.variants];

    variants[index] = {
      ...variants[index],
      [field]: value,
    };

    return {
      ...prev,
      variants,
    };
  });
}

function addVariant() {
  setFormData((prev) => ({
    ...prev,
    variants: [
      ...prev.variants,
      { ...emptyVariant },
    ],
  }));
}

function removeVariant(index) {
  setFormData((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
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

          <h5 className="mb-3">Product Variants</h5>

{formData.variants.map((variant, index) => (

  <div
    key={index}
    className="card mb-4 shadow-sm"
  >

    <div className="card-header d-flex justify-content-between align-items-center">

      <strong>
        Variant #{index + 1}
      </strong>

      {formData.variants.length > 1 && (
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => removeVariant(index)}
        >
          Remove
        </button>
      )}

    </div>

    <div className="card-body">

      <div className="row">

        {/* Size */}

        <div className="col-md-3 mb-3">

          <label>Size</label>

          <input
            className="form-control"
            value={variant.size}
            onChange={(e) =>
              updateVariant(index, "size", e.target.value)
            }
          />

        </div>

        {/* Color */}

        <div className="col-md-3 mb-3">

          <label>Color</label>

          <input
            className="form-control"
            value={variant.color}
            onChange={(e) =>
              updateVariant(index, "color", e.target.value)
            }
          />

        </div>

        {/* Price */}

        <div className="col-md-3 mb-3">

          <label>Price</label>

          <input
            type="number"
            className="form-control"
            value={variant.price}
            onChange={(e) =>
              updateVariant(index, "price", e.target.value)
            }
          />

        </div>

        {/* Stock */}

        <div className="col-md-3 mb-3">

          <label>Stock</label>

          <input
            type="number"
            className="form-control"
            value={variant.stock}
            onChange={(e) =>
              updateVariant(index, "stock", Number(e.target.value))
            }
          />

        </div>

      </div>

      <div className="row">

        {/* Discount */}

        <div className="col-md-6 mb-3">

          <label>Discount Value</label>

          <input
            type="number"
            className="form-control"
            value={variant.discountValue}
            onChange={(e) =>
              updateVariant(index, "discountValue", e.target.value)
            }
          />

        </div>

        {/* Discount Type */}

        <div className="col-md-6 mb-3">

          <label>Discount Type</label>

          <select
            className="form-select"
            value={variant.discountType}
            onChange={(e) =>
              updateVariant(index, "discountType", e.target.value)
            }
          >

            <option value="FIXED">
              Fixed
            </option>

            <option value="PERCENTAGE">
              Percentage
            </option>

          </select>

        </div>

      </div>

      <div className="row">

        {/* IMAGE 1 */}

        <div className="col-md-6 mb-3">

          <label>Image 1</label>

          {variant.image1 &&
            typeof variant.image1 === "string" && (

              <div className="mb-2">

                <img
                  src={variant.image1.startsWith("http")
                    ? variant.image1
                    : `/admin${variant.image1}`}
                  style={{
                    width: 100,
                    borderRadius: 8,
                  }}
                />

              </div>

            )}

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              updateVariant(index, "image1", e.target.files[0])
            }
          />

        </div>

        {/* IMAGE 2 */}

        <div className="col-md-6 mb-3">

          <label>Image 2</label>

          {variant.image2 &&
            typeof variant.image2 === "string" && (

              <div className="mb-2">

                <img
                  src={variant.image2.startsWith("http")
                    ? variant.image2
                    : `/admin${variant.image2}`}
                  style={{
                    width: 100,
                    borderRadius: 8,
                  }}
                />

              </div>

            )}

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              updateVariant(index, "image2", e.target.files[0])
            }
          />

        </div>

      </div>

    </div>

  </div>

))}

<div className="mb-4">

  <button
    type="button"
    className="btn btn-outline-primary"
    onClick={addVariant}
  >
    + Add Variant
  </button>

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
