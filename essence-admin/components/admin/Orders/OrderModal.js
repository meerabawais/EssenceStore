"use client";

import { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

export default function OrderModal({
    order,
    onClose,
    onSave,
}) {

    const [formData, setFormData] = useState(order);

    const [items, setItems] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [gst, setGST] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        if (!order) return;

        setFormData(order);

        setItems(order.items || []);

        setSubtotal(order.subtotal || 0);
        setGST(order.gst || 0);
        setTotal(order.total || 0);

    }, [order]);

    if (!formData) return null;

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    }

    function saveOrder() {

        onSave({

            ...formData,

            subtotal,
            gst,
            tax: 0,
            total,

            products: items,

            items,

        });

    }

    return (

        <>

            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,.5)",
                }}
            >

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h4>

                                {formData.id
                                    ? `Edit Order #${formData.id}`
                                    : "New Order"}

                            </h4>

                            <button
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>First Name</label>

                                    <input
                                        className="form-control"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Last Name</label>

                                    <input
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Email</label>

                                    <input
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone</label>

                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Country</label>

                                    <input
                                        className="form-control"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>City</label>

                                    <input
                                        className="form-control"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <label>Street Address</label>

                                    <input
                                        className="form-control"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Status</label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >

                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="PROCESSING">
                                            Processing
                                        </option>

                                        <option value="SHIPPED">
                                            Shipped
                                        </option>

                                        <option value="DELIVERED">
                                            Delivered
                                        </option>

                                        <option value="CANCELLED">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Payment Method</label>

                                    <select
                                        className="form-select"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                    >

                                        <option value="CASH_ON_DELIVERY">
                                            Cash On Delivery
                                        </option>

                                        <option value="MASTER_CARD">
                                            Master Card
                                        </option>

                                        <option value="DEBIT_CARD">
                                            Debit Card
                                        </option>

                                        <option value="PAYPAL">
                                            PayPal
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <hr />

                            <OrderItems

                                items={items}
                                setItems={setItems}

                                setSubtotal={setSubtotal}
                                setGST={setGST}
                                setTotal={setTotal}

                            />

                            <div className="row mt-4">

                                <div className="col-md-4 offset-md-8">

                                    <table className="table">

                                        <tbody>

                                            <tr>

                                                <th>Subtotal</th>

                                                <td>

                                                    ${subtotal.toFixed(2)}

                                                </td>

                                            </tr>

                                            <tr>

                                                <th>GST</th>

                                                <td>

                                                    ${gst.toFixed(2)}

                                                </td>

                                            </tr>

                                            <tr>

                                                <th>Total</th>

                                                <td>

                                                    <strong>

                                                        ${total.toFixed(2)}

                                                    </strong>

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={saveOrder}
                            >
                                Save Order
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}