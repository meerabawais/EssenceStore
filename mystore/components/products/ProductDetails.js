"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import "./ProductGallery.css";

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  return (
    <section className="product-page">
      <div className="container">

        <div className="product-card">

          <div className="row align-items-center">

      <div className="col-lg-8">
        <ProductGallery
          images={[
            selectedVariant.image1,
            selectedVariant.image2,
          ]}
        />
      </div>

      <div className="col-lg-4">
        <ProductInfo
          product={product}
          variants={product.variants}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      </div>
    </div>
      </div>

      </div>
    </section>
  );
}