"use client";

import { useState } from "react";

export default function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState("cod");

    return (
        <>
            <div className="mb-2">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {" "}PayPal
                </label>
            </div>

            <div className="mb-2">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="mastercard"
                        checked={paymentMethod === "mastercard"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {" "}MasterCard
                </label>
            </div>

            <div className="mb-2">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="debitcard"
                        checked={paymentMethod === "debitcard"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {" "}Debit Card
                </label>
            </div>

            <div className="mb-2">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {" "}Cash on Delivery
                </label>
            </div>
        </>
    );
}