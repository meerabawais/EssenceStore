"use client";

export default function InvoiceSummary({ order }) {
    return (
        <div className="card mt-4">
            <div className="card-header">
                <h5>Invoice Summary</h5>
            </div>

            <div className="card-body">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td className="text-end">
                                ${order.subtotal.toFixed(2)}
                            </td>
                        </tr>

                        <tr>
                            <td>Tax</td>
                            <td className="text-end">
                                ${order.tax.toFixed(2)}
                            </td>
                        </tr>

                        <tr>
                            <td>GST</td>
                            <td className="text-end">
                                ${order.gst.toFixed(2)}
                            </td>
                        </tr>

                        <tr className="fw-bold">
                            <td>Total</td>
                            <td className="text-end">
                                ${order.total.toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}