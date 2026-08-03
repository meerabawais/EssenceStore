"use client";
import {useState,useEffect} from "react";
export default function ActivityCard() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        subCategories: 0,
        orders: 0,
    });
    useEffect(() => {

        async function loadStats() {

            const res = await fetch("/admin/api/Profile");

            const data = await res.json();

            setStats(data);

        }

        loadStats();

    }, []);

    return (

        <div className="card profile-card">

            <div className="card-header">

                <h5 className="mb-0">

                    Account Overview

                </h5>

            </div>

            <div className="card-body">

                <div className="activity-item">

                    <span>

                        Account Created

                    </span>

                    <strong>

                        Oct 16, 2026

                    </strong>

                </div>

                <div className="activity-item">

                    <span>

                        Last Login

                    </span>

                    <strong>

                        Today

                    </strong>

                </div>

                <div className="activity-item">

                    <span>

                        Products

                    </span>

                    <strong>{stats.products}</strong>

                </div>

                <div className="activity-item">

                    <span>

                        Categories

                    </span>

                    <strong>{stats.categories}</strong>

                </div>

                <div className="activity-item">

                    <span>Orders</span>

                    <strong>{stats.orders}</strong>

                </div>

            </div>

        </div>

    );

}