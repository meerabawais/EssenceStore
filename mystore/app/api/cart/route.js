import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const cookieStore = await cookies();

    const cartCookie = cookieStore.get("cart");

    if (!cartCookie) {
        return NextResponse.json([]);
    }

    const cart = JSON.parse(cartCookie.value);

    console.log(cart);

    const validItems = cart.filter(
        item =>
            item.variantId &&
            item.quantity &&
            item.quantity > 0
    );

    const cartItems = await Promise.all(

        validItems.map(async (item) => {

            const variant = await prisma.variant.findUnique({
                where: {
                    id: item.variantId
                },
                include: {
                    product: true
                }
            });

            if (!variant) {
                return null;
            }

            return {
                product: variant.product,
                variant,
                quantity: item.quantity
            };

        })

    );

    return NextResponse.json(
        cartItems.filter(Boolean)
    );

}

export async function POST(request) {

    const { productId, variantId, quantity } = await request.json();
    console.log("POST DATA:", {
    productId,
    variantId,
    quantity,
});

    const cookieStore = await cookies();

    const existingCart = cookieStore.get("cart");

    let cart = existingCart
        ? JSON.parse(existingCart.value)
        : [];

    const existingItem = cart.find(
        item => item.variantId === variantId
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            productId,
            variantId,
            quantity
        });

    }
    console.log("CART BEFORE SAVE:", cart);

    cookieStore.set("cart", JSON.stringify(cart), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
    });

    return NextResponse.json({
        success: true
    });
}

export async function DELETE(request) {

    const { variantId } = await request.json();

    const cookieStore = await cookies();

    const existingCart = cookieStore.get("cart");

    if (!existingCart) {
        return NextResponse.json({ success: true });
    }

    const cart = JSON.parse(existingCart.value);

    const updatedCart = cart.filter(
        item => item.variantId !== variantId
    );

    cookieStore.set("cart", JSON.stringify(updatedCart), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
    });

    return NextResponse.json({
        success: true
    });

}