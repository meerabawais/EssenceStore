"use client";

export default function OrderItemsTable({items}){
    return(
        <>
        <div className="card mt-4">
            <div className="card-header">
                <h5>Order Items</h5>
            </div>
        </div>
         <div className="card-body">
                <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items?.length ? (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.size || "-"}</td>
                                    <td>{item.color || "-"}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${item.total.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No products
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </>
    );
}