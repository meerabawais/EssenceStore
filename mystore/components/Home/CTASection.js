import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="cta-area"
      style={{
        backgroundImage: "url('/img/bg-img/bg-5.jpg')",
      }}
    >
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className="cta-content text-center">
              <h6>-60%</h6>

              <h2>Global Sale</h2>

              <Link
                href="/shop"
                className="btn essence-btn"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}