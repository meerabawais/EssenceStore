"use client";

import { useEffect, useState } from "react";

import "./Operations.css";

import Header from "./Header";
import Cards from "./KPI_Cards";
import Charts from "./Charts";
import RecentOrders from "./RecentOrders";
import LowStockProducts from "./LowStockProducts";

export default function Operations() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function load() {

            const res = await fetch("/api/dashboard");

            const data = await res.json();

            setStats(data);

        }

        load();

    }, []);

    if (!stats) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />

            <Cards stats={stats} />

            <Charts data={stats.monthlyRevenue} />
            <RecentOrders orders={stats.recentOrders} />
            <LowStockProducts products={stats.lowStockProducts} />
        </>
    );
}