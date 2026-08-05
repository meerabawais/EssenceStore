import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(request) {
    try {

        const body = await request.json();
        const user = await getSessionUser();
        if(!user){
            return NextResponse.json({
                error: "please login to place an order!"
            },
        {
            status: 401,

        }
    );
        }

        const cookieStore = await cookies();

        const existingCart = cookieStore.get("cart");

        const cart = existingCart
            ? JSON.parse(existingCart.value)
            : [];

        if (cart.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        const validItems = cart.filter(
            item =>
                item.variantId &&
                item.quantity &&
                item.quantity > 0
        );

        if (validItems.length === 0) {
            return NextResponse.json(
                { error: "No valid cart items found" },
                { status: 400 }
            );
        }

        let subtotal = 0;

        const orderItems = [];
        const productsSnapshot = [];
        for (const item of validItems) {

            const variant = await prisma.variant.findUnique({

                where: {
                    id: item.variantId
                },

                include: {
                    product: true
                }

            });

            if (!variant) continue;

            const itemTotal = variant.price * item.quantity;

            subtotal += itemTotal;

            orderItems.push({

                productId: variant.product.id,

                variantId: variant.id,

                productName: variant.product.name,
                productImage: variant.image1,

                size: variant.size,

                color: variant.color,

                quantity: item.quantity,

                price: variant.price,

                total: itemTotal

            });
            productsSnapshot.push({

    productId: variant.product.id,

    variantId: variant.id,

    productName: variant.product.name,

    image: variant.image1,

    size: variant.size,

    color: variant.color,

    quantity: item.quantity,

    price: variant.price,

    total: itemTotal

});
    }
    const tax = 0;

const gst = subtotal * 0.02;

const total = subtotal + tax + gst;

      
    console.log("Order Data:", {
    firstName: body.firstName,
    lastName: body.lastName,
    company: body.company || null,
    country: body.country,
    streetAddress: body.streetAddress,
    city: body.city,
    zipCode: Number(body.zipCode),
    state: body.province,
    phone: body.phone,
    email: body.email,
    paymentMethod: body.paymentMethod,
    subtotal,
    tax,
    gst,
    total
});

        const order = await prisma.order.create({

    data: {
        userId: user.id,

        firstName: body.firstName,

        lastName: body.lastName,

        company: body.company || null,

        country: body.country,

        streetAddress: body.streetAddress,

        city: body.city,

        zipCode: Number(body.zipCode),

        state: body.province,

        phone: body.phone,

        email: body.email,

        paymentMethod: body.paymentMethod,

        products: productsSnapshot,

subtotal,

tax,

gst,

total

    }

});


        await prisma.orderItem.createMany({

            data: orderItems.map(item => ({

                orderId: order.id,

                productId: item.productId,

                variantId: item.variantId,

                productName: item.productName,
                productImage: item.productImage,

                size: item.size,

                color: item.color,

                quantity: item.quantity,

                price: item.price,

                total: item.total

            }))

        });

        cookieStore.set(
            "cart",
            JSON.stringify([]),
            {
                httpOnly: true,
                sameSite: "lax",
                path: "/"
            }
        );
        return NextResponse.json({

            success: true,

            message: "Order placed successfully",

            orderId: order.id

        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: error.message
            },
            {
                status: 500
            }
        );

    }
}