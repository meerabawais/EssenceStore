"use client";

import { useState } from "react";

export default function NotificationSettings(){

    const [notify,setNotify]=useState({

        orders:true,
        stock:true,
        customers:true,
        reports:false,

    });

    function handleChange(e){

        const {name,checked}=e.target;

        setNotify(prev=>({

            ...prev,

            [name]:checked,

        }));

    }

    return(

        <div className="card settings-card">

            <div className="card-header">

                <h5>Notifications</h5>

            </div>

            <div className="card-body">

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="orders"
                        checked={notify.orders}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        New Order Email

                    </label>

                </div>

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="stock"
                        checked={notify.stock}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        Low Stock Alert

                    </label>

                </div>

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="customers"
                        checked={notify.customers}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        New Customer Alert

                    </label>

                </div>

                <div className="form-check">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="reports"
                        checked={notify.reports}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        Weekly Report

                    </label>

                </div>

                <button className="btn btn-success save-btn">

                    Save

                </button>

            </div>

        </div>

    );

}