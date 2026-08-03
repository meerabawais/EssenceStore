"use client";

import { useEffect, useState } from "react";

export default function OrderItems({
    items,
    setItems,
    setSubtotal,
    setGST,
    setTotal,
}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        calculateTotals();
    }, [items]);

    async function fetchProducts() {

        const response = await fetch("/admin/api/products");

        const data = await response.json();

        setProducts(data);

    }

    function calculateTotals() {

        const subtotal = items.reduce(
            (sum, item) => sum + item.total,
            0
        );

        const gst = subtotal * 0.02;

        const total = subtotal + gst;

        setSubtotal(subtotal);
        setGST(gst);
        setTotal(total);

    }

    function addItem() {

        setItems(prev => [

            ...prev,

           {
    productId: "",
    variantId: "",
    productName: "",
    productImage: "",

    size: "",
    color: "",

    quantity: 1,
    price: 0,
    total: 0,
}

        ]);

    }

    function removeItem(index) {

        setItems(prev => prev.filter((_, i) => i !== index));

    }

    function changeProduct(index, productId) {

        const product = products.find(
            p => p.id === Number(productId)
        );

        const firstVariant = product?.variants[0];

        const updated = [...items];

        updated[index] = {
    ...updated[index],

    productId: product.id,
    variantId: firstVariant?.id || "",

    productName: product.name,
    productImage: firstVariant?.image1 || "",

    size: firstVariant?.size || "",
    color: firstVariant?.color || "",

    price: firstVariant?.price || 0,

    quantity: 1,

    total: firstVariant?.price || 0,
};

        setItems(updated);

    }

    function changeVariant(index, variantId) {

        const product = products.find(
            p => p.id === items[index].productId
        );

        const variant = product.variants.find(
            v => v.id === Number(variantId)
        );

       updated[index] = {
    ...updated[index],

    variantId: variant.id,

    productImage: variant.image1,

    size: variant.size,

    color: variant.color,

    price: variant.price,

    total: variant.price * updated[index].quantity,
};

        setItems(updated);

    }

    function changeQuantity(index, quantity) {

        quantity = Number(quantity);

        const updated = [...items];

        updated[index].quantity = quantity;

        updated[index].total =
            updated[index].price * quantity;

        setItems(updated);
        console.log("Selected Item:", updated[index]);

    }

    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h5>Order Items</h5>

                <button
                    className="btn btn-success"
                    onClick={addItem}
                >
                    + Add Product
                </button>

            </div>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>Product</th>

                        <th>Variant</th>

                        <th width="100">Qty</th>

                        <th width="120">Price</th>

                        <th width="120">Total</th>

                        <th width="80"></th>

                    </tr>

                </thead>

                <tbody>

                    {items.map((item, index) => (

                        <tr key={index}>

                            <td>

                                <select

                                    className="form-select"

                                    value={item.productId}

                                    onChange={(e) =>
                                        changeProduct(
                                            index,
                                            e.target.value
                                        )
                                    }

                                >

                                    <option value="">
                                        Select Product
                                    </option>

                                    {products.map(product => (

                                        <option

                                            key={product.id}

                                            value={product.id}

                                        >

                                            {product.name}

                                        </option>

                                    ))}

                                </select>

                            </td>

                            <td>

                                <select

                                    className="form-select"

                                    value={item.variantId}

                                    onChange={(e) =>
                                        changeVariant(
                                            index,
                                            e.target.value
                                        )
                                    }

                                >

                                    {(products.find(
                                        p => p.id === item.productId
                                    )?.variants || []).map(v => (

                                        <option
                                            key={v.id}
                                            value={v.id}
                                        >

                                            {v.size} / {v.color} — ${v.price}

                                        </option>

                                    ))}

                                </select>

                            </td>

                            <td>

                                <input

                                    type="number"

                                    min="1"

                                    className="form-control"

                                    value={item.quantity}

                                    onChange={(e) =>
                                        changeQuantity(
                                            index,
                                            e.target.value
                                        )
                                    }

                                />

                            </td>

                            <td>

                                ${item.price.toFixed(2)}

                            </td>

                            <td>

                                ${item.total.toFixed(2)}

                            </td>

                            <td>

                                <button

                                    className="btn btn-danger"

                                    onClick={() =>
                                        removeItem(index)
                                    }

                                >

                                    ×

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </>

    );

}