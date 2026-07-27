"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({ product }) {

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`${product.name} added to cart!`);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-product-wrapper">

        {/* Product Image */}
        <div className="product-img">
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", display: "block" }}
          />

          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="hover-img"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <div className={`product-badge ${product.badge}`}>
              <span>{product.discount || product.badge}</span>
            </div>
          )}

          {/* Favourite */}
          <div className="product-favourite">
            <button
              className="favme"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <FaHeart />
            </button>
          </div>
        </div>

        {/* Product Description */}
        <div className="product-description">
          <span>{product.brand}</span>

          <Link href={`/shop/${product.id}`}>
            <h6>{product.name}</h6>
          </Link>

          <p className="product-price">
            {product.oldPrice && (
              <span className="old-price">
                ${product.oldPrice}
              </span>
            )}{" "}
            ${product.price}
          </p>

          {/* Hover Content */}
          <div className="hover-content">
            <div className="add-to-cart-btn">
              <button
                className="btn essence-btn w-100"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}