"use client";

import {useState, useEffect} from 'react';
import InvoiceHeader from "./InvoiceHeader";
import OrderItemsTable from "./OrderItemsTable";
import CustomerInfo from './CustomerInfo';
import InvoiceSummary from "./InvoiceSummary";

export default function Invoice({id}){
    const [order,setOrder] = useState(null);
    useEffect(()=>{
        async function loadInvoice(){
            const res = await fetch(`/api/All-orders/${id}`);
            const data = await res.json();
            setOrder(data);
        }
        loadInvoice();
    },[id]);
    if(!order){
        return <h3 className='text-center mt-5'>Loading Invoice...</h3>
    }
    return(
        <div className='container-fluid py-4 invoice-page'>
            <InvoiceHeader order={order}></InvoiceHeader>
            <CustomerInfo order={order}></CustomerInfo>
            <OrderItemsTable items={order.items}></OrderItemsTable>
            <InvoiceSummary order={order}></InvoiceSummary>
        </div>
    );
}


