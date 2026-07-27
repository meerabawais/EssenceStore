"use client";

import { useEffect, useState } from "react";

export default function KPICards({stats}) {

    return (

        <div className="kpi-grid">

            <div className="kpi-card">
                <h2>${stats.totalRevenue.toFixed(2)}</h2>
                <p>Total Revenue</p>
            </div>

            <div className="kpi-card">
                <h2>{stats.totalOrders}</h2>
                <p>Total Orders</p>
            </div>

            <div className="kpi-card">
                <h2>${stats.averageOrderValue.toFixed(2)}</h2>
                <p>Average Order Value</p>
            </div>

            <div className="kpi-card">
                <h2>{stats.pendingOrders}</h2>
                <p>Pending Orders</p>
            </div>

        </div>

    );

}