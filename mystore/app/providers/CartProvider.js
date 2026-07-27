"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

   const loadCart = async () => {
    console.log("Loading cart...");

    const response = await fetch("/api/cart");
    const data = await response.json();

    console.log("Cart data received:", data);

    setCart(data);
};

    useEffect(() => {

        loadCart();

    }, []);
    useEffect(() => {
    console.log("Cart state changed:", cart);
}, [cart]);

    return (

        <CartContext.Provider
            value={{
                cart,
                refreshCart: loadCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}