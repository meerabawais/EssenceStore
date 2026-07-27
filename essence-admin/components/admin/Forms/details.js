import "./details.css";

export default function Details() {

  return (

    <div className="card">

      <div className="card-header">

        <h3>New Order</h3>

      </div>

      <div className="card-body">

        <label>Customer Name</label>

        <input
          type="text"
          placeholder="Full Name..."
        />

        <div className="row">

          <div>

            <label>Order</label>

            <input type="text" />

          </div>

          <div>

            <label>Total</label>

            <input type="number" />

          </div>

        </div>

        <div className="row">

          <div>

            <label>Date of Order</label>

            <input type="date" />

          </div>

          <div>

            <label>Status</label>

            <input type="text" />

          </div>

        </div>

        <label>Description</label>

        <textarea rows="6"></textarea>

        <button className="btn btn-primary">Submit Form</button>

      </div>

    </div>

  );

}