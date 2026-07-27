"use client";

import { useState } from "react";

export default function PaymentSettings(){

    const [payment,setPayment]=useState({

        cod:true,
        paypal:true,
        debit:false,
        mastercard:true,

    });

    function handleChange(e){

        const {name,checked}=e.target;

        setPayment(prev=>({

            ...prev,

            [name]:checked,

        }));

    }

    return(

        <div className="card settings-card">

            <div className="card-header">

                <h5>Payment Methods</h5>

            </div>

            <div className="card-body">

                {[
                    ["cod","Cash On Delivery"],
                    ["paypal","Paypal"],
                    ["debit","Debit Card"],
                    ["mastercard","Master Card"],
                ].map(([key,label])=>(

                    <div
                        className="form-check"
                        key={key}
                    >

                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={key}
                            checked={payment[key]}
                            onChange={handleChange}
                        />

                        <label className="form-check-label">

                            {label}

                        </label>

                    </div>

                ))}

                <button className="btn btn-success save-btn">

                    Save

                </button>

            </div>

        </div>

    );

}