"use client";

export default function LowStockProducts({ products }) {
    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">

                <h3 className="mb-4">Low Stock Products</h3>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Variant</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No low stock products
                                </td>
                            </tr>
                        ) : (
                            products.map((variant) => (
                                <tr key={variant.id}>
                                    <td>{variant.product.name}</td>
                                    <td>{variant.size}</td>
                                    <td>{variant.stock}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>
        </div>
    );
}