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

    const [page, setPage] = useState(1);

    const [pageSize] = useState(10);

    const [totalPages, setTotalPages] = useState(1);

    const [totalOrders, setTotalOrders] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {

        load(page, search);

    }, [page, search]);

    async function load(pageNumber = 1, searchText = "") {

        const statsRes = await fetch("/admin/api/dashboard");
        const statsData = await statsRes.json();
        setStats(statsData);

        const ordersRes = await fetch(
            `/admin/api/All-orders?page=${pageNumber}&pageSize=${pageSize}&search=${encodeURIComponent(searchText)}`
        );

        const data = await ordersRes.json();

        setOrders(data.orders);
        setTotalPages(data.totalPages);
        setTotalOrders(data.totalOrders);
    }

    if (!stats) {
        return <p>Loading...</p>;
    }

    async function deleteOrder(id) {

        if (!confirm("Delete this order?")) return;

        await fetch(`/admin/api/All-orders/${id}`, {
            method: "DELETE",
        });

        load(page);
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

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        setShowModal(false);

        load(page);
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

            <OrdersTable
                 orders={orders}
    page={page}
    setPage={setPage}
    totalPages={totalPages}
    totalOrders={totalOrders}
    search={search}
    setSearch={setSearch}
    createOrder={createOrder}
    editOrder={editOrder}
    deleteOrder={deleteOrder}
            />

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