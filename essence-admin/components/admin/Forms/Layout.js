import "./Layout.css";
import Details from "./details";

export default function Layout() {
  return (
    <div className="forms-page">

      {/* Header */}

      <div className="forms-header">

        <div>
          <h1>Forms</h1>
        </div>

        <div className="header-buttons">
          <button>Advanced</button>
          <button>Validation</button>
          <button>Wizard</button>
          <button>Upload</button>
        </div>

      </div>

      {/* Body */}

      <div className="forms-body">

        {/* Left */}

        <div className="left-column">
          <Details />
        </div>

        {/* Right */}

        <div className="right-column">

          <div className="card">

            <h3>Tips</h3>

            <p><strong>Be specific</strong> with your project name.</p>

            <p><strong>Set a realistic budget.</strong></p>

            <p><strong>Tags</strong> help filter projects.</p>

          </div>

          <div className="card">

            <h3>Need Help?</h3>

            <p>
              Read our project guide or contact support.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}