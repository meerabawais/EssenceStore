"use client";

import { useState } from "react";

export default function TaxSettings() {

    const [tax, setTax] = useState({

        gst: 17,
        salesTax: 5,
        shippingTax: 2,
        enableTax: true,

    });

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setTax((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    }

    function saveSettings() {

        alert("Tax settings saved!");

        // Later this will call your API

    }

    return (

        <div className="card settings-card">

            <div className="card-header">

                <h5 className="mb-0">

                    Tax Settings

                </h5>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">

                        GST (%)

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="gst"
                        value={tax.gst}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">

                        Sales Tax (%)

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="salesTax"
                        value={tax.salesTax}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">

                        Shipping Tax (%)

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="shippingTax"
                        value={tax.shippingTax}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-check form-switch mb-4">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="enableTax"
                        checked={tax.enableTax}
                        onChange={handleChange}
                    />

                    <label className="form-check-label">

                        Enable Tax Calculation

                    </label>

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