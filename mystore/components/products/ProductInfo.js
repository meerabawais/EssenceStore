"use client";
import VariantSelector from "./VariantSelector";
import { useState } from "react";
import { useCart } from "@/app/providers/CartProvider";
import QuantitySelector from "./QuantitySelector";
export default function ProductInfo({ product, variants , selectedVariant,onVariantChange}) {
  const [quantity, setQuantity] = useState(1);
  const { refreshCart } = useCart();

  const handleAddToCart = async () => {

    console.log("selectedVariant:", selectedVariant);
    console.log("quantity:", quantity);

    const body = {
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
    };

    console.log("Request Body:", body);

    const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
        await refreshCart();
    }

    console.log(data);
};

  return (
    <div className="single_product_desc clearfix">
      <span>{product.brand}</span>

      <h2>{product.name}</h2>
      <p className="product-price">

  {selectedVariant.discountValue ? (
    <>
      <span className="old-price">
        $
        {selectedVariant.discountType === "FIXED"
          ? selectedVariant.price + selectedVariant.discountValue
          : (
              selectedVariant.price /
              (1 - selectedVariant.discountValue / 100)
            ).toFixed(2)}
      </span>

      ${selectedVariant.price}
    </>
  ) : (
    <>${selectedVariant.price}</>
  )}

</p>

      <p className="product-desc">
        {product.description}
      </p>
    <p
    className={`stock-text ${
        selectedVariant.stock > 0
            ? "text-success"
            : "text-danger"
    }`}
></p>
      <VariantSelector
  variants={variants}
  selectedVariant={selectedVariant}
  onVariantChange={onVariantChange}
/>

      <div className="mb-4">
        <h6>Quantity</h6>

        <QuantitySelector
          onQuantityChange={setQuantity}
        />
      </div>
<div className="cart-fav-box d-flex align-items-center gap-3">
   <button
    className="btn essence-btn"
    onClick={handleAddToCart}
>
    Add To Cart
</button>
</div>
        <div className="product-favourite ml-4">
          <button
    className="btn btn-light rounded-circle ms-3"
    style={{
        width: "55px",
        height: "55px",
        fontSize: "22px"
    }}
>
    ♥
</button>
        </div>
      </div>
  );
}