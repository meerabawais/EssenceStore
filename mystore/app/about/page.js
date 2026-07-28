import BreadCrumb from "@/components/layout/BreadCrumb";

export default function AboutPage() {
  return (
    <>
      <BreadCrumb />

      <section className="about_area section-padding-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 text-center">
              <h2>About Essence Store</h2>
              <p>
                Essence Store is a fashion destination built around quality
                pieces, considered curation, and a shopping experience that
                stays out of your way. Browse the shop, find what fits, and
                check out in a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
