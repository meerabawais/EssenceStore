"use client";

import { useState, useEffect } from "react";

export default function QuantitySelector({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="cart-plus-minus d-flex align-items-center mt-4">

      <button
        className="btn btn-light"
        onClick={decrease}
      >
        -
      </button>

      <input
        type="text"
        value={quantity}
        readOnly
        className="form-control text-center mx-2"
        style={{ width: "70px" }}
      />

      <button
        className="btn btn-light"
        onClick={increase}
      >
        +
      </button>

    </div>
  );
}