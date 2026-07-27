"use client";

export default function CustomerInfo({ order }) {

    return (

        <div className="row mb-4">

            <div className="col-md-6">

                <div className="card shadow-sm h-100">

                    <div className="card-body">

                        <h5 className="mb-3">
                            Customer
                        </h5>

                        <p>
                            <strong>
                                {order.firstName} {order.lastName}
                            </strong>
                        </p>

                        <p>{order.email}</p>

                        <p>{order.phone}</p>

                    </div>

                </div>

            </div>

            <div className="col-md-6">

                <div className="card shadow-sm h-100">

                    <div className="card-body">

                        <h5 className="mb-3">
                            Shipping Address
                        </h5>

                        <p>{order.streetAddress}</p>

                        <p>
                            {order.city}, {order.state}
                        </p>

                        <p>{order.country}</p>

                        <p>ZIP: {order.zipCode}</p>

                    </div>

                </div>

            </div>

        </div>

    );

}