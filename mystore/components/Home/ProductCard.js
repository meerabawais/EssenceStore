"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const variant = product.variants?.[0];

  if (!variant) return null;

  const oldPrice =
    variant.discountValue && variant.discountType === "FIXED"
      ? variant.price + variant.discountValue
      : null;

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          variantId: variant.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`${product.name} added to cart!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-product-wrapper">

        <div className="product-img">
  <Link href={`/shop/${product.id}`}>
    <img
      src={variant.image1}
      alt={product.name}
      className="default-img"
    />

    {variant.image2 && (
      <img
        src={variant.image2}
        alt={product.name}
        className="hover-img"
      />
    )}
  </Link>

          {oldPrice && (
            <div className="product-badge offer-badge">
              <span>Sale</span>
            </div>
          )}

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

        <div className="product-description">
          <span>{product.brand}</span>

          <Link href={`/shop/${product.id}`}>
            <h6>{product.name}</h6>
          </Link>

          <p className="product-price">
            {oldPrice && (
              <span className="old-price">
                ${oldPrice}
              </span>
            )}
            ${variant.price}
          </p>

        </div>

      </div>
      </div>
  );
}