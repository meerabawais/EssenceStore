"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/CartProvider";

import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod"; 

export default function CheckoutLayout(){
    const {cart, refreshCart} = useCart();
    const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    company: "",
    country: "Pakistan",
    streetAddress: "",
    zipCode: "",
    city: "",
    province: "",
    phone: "",
    email: "",
    paymentMethod: "CASH_ON_DELIVERY",

});
   console.log(formData);
const handlePlaceOrder = async () => {

    const orderData = {
        ...formData,
        items: cart,
    };

    console.log("Order Data:", orderData);
    console.log(cart);
    const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    const data = await response.json();

    console.log(data);
};
    return(
          <section className="checkout_area section-padding-80">

            <div className="container">

                <div className="row">

                    {/* Left Side */}

                    <div className="col-lg-7">

                        <BillingForm
    formData={formData}
    setFormData={setFormData}
/>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-5">

                        <OrderSummary
    items={cart}
/>

                        <div className="card shadow-sm p-4">

                            <h5 className="mb-4">
                                Payment Method
                            </h5>

                            <PaymentMethod
    formData={formData}
    setFormData={setFormData}
/>

                            <button
    className="btn essence-btn w-100 mt-4"
    onClick={handlePlaceOrder}
>
    Place Order
</button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}