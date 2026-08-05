"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./Products.css";

import ProductModal from "./ProductModal";

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
  console.log("Current pathname:", window.location.pathname);

  const productsRes = await fetch("/admin/api/products");

  console.log("Status:", productsRes.status);
  console.log("URL:", productsRes.url);

  const productsData = await productsRes.json();

  console.log(productsData);

  setProducts(productsData);

  const categoriesRes = await fetch("/admin/api/categories");
  const categoriesData = await categoriesRes.json();

  setCategories(categoriesData);
}

  function createProduct() {
    setSelectedProduct({
      categoryId: "",

      subCategoryId: "",

      brand: "",

      name: "",

      description: "",

      status: true,

      variants: [
       {
        size: "",

        color: "",

        price: "",

        stock: 0,

        image1: "",

        image2: "",

        discountValue: "",

        discountType: "FIXED",
      },
    ],
    });

    setShowProductModal(true);
  }

  function editProduct(product) {
  setSelectedProduct(product);

  setShowProductModal(true);
}

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    await fetch(`/admin/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
 function getImageUrl(image) {
  if (!image) return "/admin/img/product-img/default.png";

  if (image.startsWith("/admin")) {
    return image;
  }

  return `/admin${image}`;
}

async function saveProduct(product) {
  let url = "/admin/api/products";
  let method = "POST";

  if (product.id) {
    url = `/admin/api/products/${product.id}`;
    method = "PUT";
  }

  const data = new FormData();

  data.append("name", product.name);
  data.append("brand", product.brand);
  data.append("description", product.description);
  data.append("categoryId", product.categoryId);
  data.append("subCategoryId", product.subCategoryId);

  product.variants.forEach((variant, index) => {

  if (variant.id) {
    data.append(`variants[${index}][id]`, variant.id);
  }

  data.append(`variants[${index}][size]`, variant.size);
  data.append(`variants[${index}][color]`, variant.color);
  data.append(`variants[${index}][price]`, variant.price || 0);
  data.append(`variants[${index}][stock]`, variant.stock);
  data.append(`variants[${index}][discountValue]`, variant.discountValue || 0);
  data.append(`variants[${index}][discountType]`, variant.discountType);

  // Image 1
  if (variant.image1 instanceof File) {
    data.append(`variants[${index}][image1]`, variant.image1);
  } else {
    data.append(
      `variants[${index}][existingImage1]`,
      variant.image1 || ""
    );
  }

  // Image 2
  if (variant.image2 instanceof File) {
    data.append(`variants[${index}][image2]`, variant.image2);
  } else {
    data.append(
      `variants[${index}][existingImage2]`,
      variant.image2 || ""
    );
  }

});

  data.append("status", product.status);

  const response = await fetch(url, {
    method,
    body: data,
  });

  const saved = await response.json();

  if (product.id) {
    setProducts((prev) =>
      prev.map((p) => (p.id === saved.id ? saved : p))
    );
  } else {
    setProducts((prev) => [saved, ...prev]);
  }

  setShowProductModal(false);
}

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <p className="catalog-text">CATALOG</p>

          <h2>Products</h2>
        </div>

        <div className="header-buttons">
          <button
            className="category-btn"
            onClick={() => router.push("/Categories")}
          >
            Categories
          </button>

          <button className="add-btn" onClick={createProduct}>
            + Add Product
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filters">
          <span className="filter-chip active">Women</span>

          <span className="filter-chip">Men</span>

          <span className="filter-chip">Kids</span>

          <span className="filter-chip">Shoes</span>

          <span className="filter-chip">Accessories</span>
        </div>
      </div>

      <div className="products-grid">
  {products.map((product) => (
    <div className="product-card" key={product.id}>

      <div className="product-image">
        <img
          src={getImageUrl(product.variants?.[0]?.image1)}
          alt={product.name}
        />
      </div>

      <div className="product-content">

        <h4>{product.name}</h4>

        <p>{product.category?.name}</p>

        <div className="price">
          £{product.variants?.[0]?.price}
        </div>

        <span className="stock">
          Stock: {product.variants?.[0]?.stock}
        </span>

        {/* Product Status */}
        <div className="mt-2">
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
        </div>

        <div className="mt-3">

          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => editProduct(product)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  ))}
</div>

      {showProductModal && (
        <ProductModal
          product={selectedProduct}
          categories={categories}
          onClose={() => setShowProductModal(false)}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}
