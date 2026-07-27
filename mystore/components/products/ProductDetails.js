"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  return (
    <div className="row">
      <div className="col-lg-6">
        <ProductGallery
          images={[
            selectedVariant.image1,
            selectedVariant.image2,
          ]}
        />
      </div>

      <div className="col-lg-6 ps-lg-8">
        <ProductInfo
          product={product}
          variants={product.variants}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      </div>
    </div>
  );
}