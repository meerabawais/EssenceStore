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

      variant: {
        size: "",

        color: "",

        price: 0,

        stock: 0,

        image1: "",

        image2: "",

        discountValue: 0,

        discountType: "FIXED",
      },
    });

    setShowProductModal(true);
  }

  function editProduct(product) {
    setSelectedProduct({
      ...product,

      variant: product.variants[0],
    });

    setShowProductModal(true);
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    await fetch(`/admin/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function saveProduct(product) {
  let url = "/admin/api/products";
  let method = "POST";

  if (product.id) {
    url = `/admin/api/products/${product.id}`;
    method = "PUT";
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
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
  function getImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `/admin${path}`;
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
