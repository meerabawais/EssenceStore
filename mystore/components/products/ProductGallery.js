"use client";

import "./ProductGallery.css";
import { useState } from "react";


export default function ProductGallery({ images }) {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(validImages[0]);

  return (
    <div className="single_product_thumb">

    <img
        src={selectedImage}
        alt="Product"
        className="product-main-image"
    />

    <div className="thumbnail-container">

        {validImages.map((image, index) => (

            <img
                key={index}
                src={image}
                alt=""
                onClick={() => setSelectedImage(image)}
                className={`product-thumbnail ${
                    selectedImage === image ? "active" : ""
                }`}
            />

        ))}

    </div>

</div>
  );
}