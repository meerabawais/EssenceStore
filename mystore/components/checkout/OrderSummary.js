export default function OrderSummary({items}) {
    const subtotal = items.reduce(
        (total, item) => total + item.variant.price * item.quantity,
        0
    );

    const shipping = 0;
    const tax = 0;
    const gst = subtotal*0.02;
    const total = subtotal + shipping +tax +gst;

    return (
        <div className="order-details-confirmation mb-4">

            <div className="cart-page-heading mb-4">
                <h5>Your Order</h5>
                <p>The Details</p>
            </div>

            <ul className="list-group">

                <li className="list-group-item d-flex justify-content-between fw-bold">
                    <span>Product</span>
                    <span>Total</span>
                </li>

                {items.map(item => (

                    <li
                        key={item.variant.id}
                        className="list-group-item d-flex justify-content-between"
                    >

                        <div>

                            <h6 className="mb-1">
                                {item.product.name}
                            </h6>

                            <small className="text-muted">
                                Size: {item.variant.size} |
                                Color: {item.variant.color}
                            </small>

                            <br />

                            <small className="text-muted">
                                Qty: {item.quantity}
                            </small>

                        </div>

                        <span>
                            ${(item.variant.price * item.quantity).toFixed(2)}
                        </span>

                    </li>

                ))}

                <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </li>

                <li className="list-group-item d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </li>

            </ul>

        </div>
    );
}