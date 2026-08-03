"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import KPICards from "../Operations/KPI_Cards";
import OrdersTable from "./OrderTable";
import OrderModal from "./OrderModal";

import "./Orders.css";
import "../Operations/Operations.css";

export default function Orders() {

    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {

        async function load() {

            const statsRes = await fetch("/admin/api/dashboard");
            const statsData = await statsRes.json();
            setStats(statsData);

            const ordersRes = await fetch("/admin/api/All-orders");
            const ordersData = await ordersRes.json();
            setOrders(ordersData);

        }

        load();

    }, []);

    if (!stats) {
        return <p>Loading...</p>;
    }

    async function deleteOrder(id) {

    if (!confirm("Delete this order?")) return;

    await fetch(`/admin/api/All-orders/${id}`, {
        method: "DELETE",
    });

    setOrders((prev) => prev.filter((order) => order.id !== id));
}
function editOrder(order) {
    setSelectedOrder(order);
    setShowModal(true);
}
async function updateOrder(order) {

    const isEdit = !!order.id;

    const url = isEdit
        ? `/admin/api/All-orders/${order.id}`
        : "/admin/api/All-orders";

    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    const savedOrder = await response.json();

    if (isEdit) {
        setOrders(prev =>
            prev.map(o =>
                o.id === savedOrder.id ? savedOrder : o
            )
        );
    } else {
        setOrders(prev => [savedOrder, ...prev]);
    }

    setShowModal(false);
}
function createOrder() {

    setSelectedOrder({

        firstName: "",
        lastName: "",
        company: "",

        email: "",
        phone: "",

        country: "",
        city: "",
        state: "",
        streetAddress: "",
        zipCode: 0,

        paymentMethod: "CASH_ON_DELIVERY",

        status: "PENDING",

        subtotal: 0,
        gst: 0,
        tax: 0,
        total: 0,

        items: [],

    });

    setShowModal(true);
}
    return (
        <>
            <Header />

            <KPICards stats={stats} />

            <OrdersTable orders={orders} createOrder={createOrder} editOrder={editOrder} deleteOrder={deleteOrder}/>
                {showModal && (
            <OrderModal
                order={selectedOrder}
                onClose={() => setShowModal(false)}
                onSave={updateOrder}
            />
        )}
        </>
    );
}