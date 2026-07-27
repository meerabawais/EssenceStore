export default function Newsletter() {
  return (
    <section className="newsletter-area section-padding-80-0">

      <div className="container">

        <div className="row align-items-center">

          <div className="col-12 col-lg-6">

            <div className="newsletter-text mb-80">

              <h2>
                Subscribe for a <span>25% Discount</span>
              </h2>

              <p>
                Subscribe to receive updates about our latest products,
                exclusive offers, and seasonal collections.
              </p>

            </div>

          </div>

          <div className="col-12 col-lg-6">

            <div className="newsletter-form mb-80">

              <form>

                <input
                  type="email"
                  placeholder="Your E-mail"
                />

                <button
                  type="submit"
                  className="btn essence-btn"
                >
                  Subscribe
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}