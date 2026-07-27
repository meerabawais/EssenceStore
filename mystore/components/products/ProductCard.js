"use client";
console.log("ProductCard rendered");

import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-product-wrapper">

        {/* Product Image */}
        <div className="product-img">

          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="default-img"
          />

          {/* Hover Image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="hover-img"
            />
          )}

          {/* Offer Badge */}
          {product.discount && (
            <div className="product-badge offer-badge">
              <span>{product.discount}</span>
            </div>
          )}

          {/* New Badge */}
          {product.badge === "new" && (
            <div className="product-badge new-badge">
              <span>New</span>
            </div>
          )}

          {/* Favourite */}
          <div className="product-favourite">
            <a href="#" className="favme">
              <FaHeart />
            </a>
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
            )}
            ${product.price}
          </p>

          {/* Hover Content */}
          <div className="hover-content">
            <div className="add-to-cart-btn">
              <button className="btn essence-btn w-100">
                Add to Cart
              </button>
            </div>
          </div>

        </div>

      </div>.
      console.log(product);
    </div>
  );
}