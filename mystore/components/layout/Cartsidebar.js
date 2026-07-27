"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {useCart} from "@/app/providers/CartProvider"

export default function Cartsidebar({ isopen, onclose }) {
    const { cart, refreshCart } = useCart();
    const subtotal = cart.reduce(
        (sum, item) => sum + item.variant.price * item.quantity,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    const handleRemove = async (variantId) => {

    const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            variantId,
        }),
    });

    const data = await response.json();

    if (data.success) {
        await refreshCart();
    }

};

    return (
        <>
            <div
                className={`cart-bg-overlay ${
                    isopen ? "cart-bg-overlay-on" : ""
                }`}
                onClick={onclose}
            ></div>

            <div
                className={`right-side-cart-area ${
                    isopen ? "cart-on" : ""
                }`}
            >
                <div className="cart-content d-flex">

                    {/* Cart Items */}

                    <div className="cart-list">

                        {cart.length === 0 ? (
                            <div className="p-4 text-center">
                                <h5>Your cart is empty</h5>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    className="single-cart-item"
                                    key={item.variant.id}
                                >
                                    <Link
                                        href={`/shop/${item.product.id}`}
                                        className="product-image"
                                    >
                                        <Image
                                            src={item.variant.image1}
                                            alt={item.product.name}
                                            className="cart-thumb"
                                            width={190}
                                            height={250}
                                        />

                                        <div className="cart-item-desc">

                                            <button
    className="product-remove"
    onClick={() => handleRemove(item.variant.id)}
    style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
    }}
>
    ✕
</button>

                                            <span className="badge">
                                                {item.product.brand}
                                            </span>

                                            <h6>{item.product.name}</h6>

                                            <p className="size">
                                                Size: {item.variant.size}
                                            </p>

                                            <p className="color">
                                                Color: {item.variant.color}
                                            </p>

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="price">
                                                ${item.variant.price.toFixed(2)}
                                            </p>

                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}

                    </div>
                    <div className="cart-amount-summary">

                        <h2>Summary</h2>

                        <ul className="summary-table">

                            <li>
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </li>

                            <li>
                                <span>Delivery:</span>
                                <span>Free</span>
                            </li>

                            <li>
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </li>

                        </ul>

                        <div className="checkout-btn mt-100">

                            <Link
                                href="/checkout"
                                className="btn essence-btn"
                            >
                                Check Out
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="cart-close" onClick={onclose}>
                    ✕
                </div>
            </div>
        </>
    );
}