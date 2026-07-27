"use client";
import Link from "next/link";

export default function OrdersTable( {orders, editOrder,  deleteOrder, createOrder}) {

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3>All Orders</h3>

                    <button className="btn btn-success"  onClick={createOrder}>
                        + New Order
                    </button>

                </div>

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.id}>

                                <td>#{order.id}</td>

                                <td>
    {order.firstName} {order.lastName}
</td>

                                <td>{order.items ? order.items.length : 0}</td>

                                <td>${Number(order.total || 0).toFixed(2)}</td>

                                <td>

                                    <span
    className={`badge ${
        order.status === "PENDING"
            ? "bg-warning"
            : order.status === "PROCESSING"
            ? "bg-info"
            : order.status === "SHIPPED"
            ? "bg-primary"
            : order.status === "DELIVERED"
            ? "bg-success"
            : "bg-danger"
    }`}
>
    {order.status}
</span>

                                </td>

                                <td>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                <td>
                                    <Link
        href={`/Invoice/${order.id}`}
        className="btn btn-sm btn-outline-secondary me-2"
    >
        Invoice
    </Link>


                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editOrder(order)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteOrder(order.id)}>
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}