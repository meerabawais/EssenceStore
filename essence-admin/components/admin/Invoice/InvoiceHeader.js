"use client";

export default function InvoiceHeader({order}){
    function printInvoice(){
            window.print();
        }
    return(
        <div className="card shadow-sm mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="fw-bold mb-1">Essence Store</h2>
                    <p className="text-muted mb-0">Premium Fashion Store</p>
                </div>
                <div className="text-end">
                    <h4>Invoice</h4>
                    <p className="mb-1">
                        <strong>Invoice #</strong> INV-{order.id}
                    </p>

                    <p className="mb-1">
                        <strong>Order #</strong> {order.id}
                    </p>

                    <p className="mb-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <span
                        className={`badge fs-6 ${
                            order.status === "DELIVERED"
                                ? "bg-success"
                                : order.status === "PENDING"
                                ? "bg-warning text-dark"
                                : order.status === "PROCESSING"
                                ? "bg-primary"
                                : order.status === "SHIPPED"
                                ? "bg-info text-dark"
                                : "bg-danger"
                        }`}
                    >
                        {order.status}
                    </span>

                    <div className="mt-3">

                        <button
                            className="btn btn-dark me-2"
                            onClick={printInvoice}
                        >
                            Print
                        </button>

                        <button
                            className="btn btn-success"
                        >
                            Download PDF
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}