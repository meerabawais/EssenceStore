"use client";

import { useEffect, useState } from "react";
import "./CustomerTable.css";

export default function CustomerTable(){

    const [orders,setOrders]=useState([]);

    useEffect(()=>{

        async function load(){

            const res=await fetch("/api/Order");

            const data=await res.json();

            setOrders(data);

        }

        load();

    },[]);

    return(

        <div className="table-card">

            <table>

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Customer</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Total</th>

                        <th>Payment</th>

                        <th>Status</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map(order=>(

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>

                                {order.firstName} {order.lastName}

                            </td>

                            <td>{order.email}</td>

                            <td>{order.phone}</td>

                            <td>${order.total}</td>

                            <td>{order.paymentMethod.replaceAll("_"," ")}</td>

                            <td>

                                <span className={`status ${order.status.toLowerCase()}`}>

                                    {order.status}

                                </span>

                            </td>

                            <td>

                                {new Date(order.createdAt)
                                    .toLocaleDateString()}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}