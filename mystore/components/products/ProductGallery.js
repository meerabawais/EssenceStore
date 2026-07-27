"use client";

import { useState } from "react";

export default function ProductGallery({ images }) {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(validImages[0]);

  return (
    <div className="single_product_thumb clearfix">

      <div className="mb-3">

        <img
          src={selectedImage}
          alt="Product"
          className="img-fluid w-100"
          style={{
            borderRadius: "5px",
          }}
        />

      </div>


      <div
        className="d-flex"
        style={{
          gap: "10px",
        }}
      >

        {validImages.map((image, index) => (

          <img
            key={index}
            src={image}
            alt=""
            onClick={() => setSelectedImage(image)}
            style={{
              width: "90px",
              height: "120px",
              objectFit: "cover",
              cursor: "pointer",
              border:
                selectedImage === image
                  ? "2px solid #0315ff"
                  : "1px solid #ddd",
            }}
          />

        ))}

      </div>

    </div>
  );
}