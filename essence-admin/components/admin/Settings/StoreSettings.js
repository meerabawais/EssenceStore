"use client";

import { useState } from "react";

export default function StoreSettings() {

    const [store, setStore] = useState({

        storeName: "Essence Store",
        email: "admin@essence.com",
        phone: "+92 303 5550605",
        address: "Pakistan",
        currency: "PKR",
    });

    function handleChange(e){

        const {name,value}=e.target;

        setStore(prev=>({

            ...prev,

            [name]:value,

        }));

    }

    function saveSettings(){

        alert("Store settings saved!");

    }

    return(

        <div className="card settings-card">

            <div className="card-header">

                <h5>Store Settings</h5>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label>Store Name</label>

                    <input
                        className="form-control"
                        name="storeName"
                        value={store.storeName}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>Email</label>

                    <input
                        className="form-control"
                        name="email"
                        value={store.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>Phone</label>

                    <input
                        className="form-control"
                        name="phone"
                        value={store.phone}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>Address</label>

                    <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={store.address}
                        onChange={handleChange}
                    />

                </div>

                <div className="row">

                    <div className="col-md-6">

                        <label>Currency</label>

                        <select
                            className="form-select"
                            name="currency"
                            value={store.currency}
                            onChange={handleChange}
                        >

                            <option>USD</option>
                            <option>EUR</option>
                            <option>PKR</option>

                        </select>

                    </div>

                   
                </div>

                <button
                    className="btn btn-success save-btn"
                    onClick={saveSettings}
                >

                    Save Changes

                </button>

            </div>

        </div>

    );

}