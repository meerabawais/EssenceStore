"use client";

export default function RecentOrders({ orders }) {
    return (
        <div className="card shadow-sm mt-4">
    <div className="card-body">

        <h3 className="mb-4">Recent Orders</h3>

            <table className="table table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}