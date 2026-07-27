"use client";

import Header from "./Header";
import StoreSettings from "./StoreSettings";
import TaxSettings from "./TaxSettings";
import NotificationSettings from "./NotificationSettings";
import PaymentSettings from "./PaymentSettings";
import "./Settings.css";

export default function Settings(){

    return(

        <div className="settings-page container-fluid">

            <Header/>

            <div className="row g-4">

                <div className="col-lg-6">

                    <StoreSettings/>

                </div>

                <div className="col-lg-6">

                    <TaxSettings/>

                </div>

                <div className="col-lg-6">

                    <PaymentSettings/>

                </div>

                <div className="col-lg-6">

                    <NotificationSettings/>

                </div>

            </div>

        </div>

    );

}