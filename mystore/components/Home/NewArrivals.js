import ProductCard from "./ProductCard";
import products from "@/data/Products";

export default function NewArrivals() {
  return (
    <section className="new_arrivals_area section-padding-80 clearfix">

      <div className="container">

        <div className="row">

          <div className="col-12">

            <div className="section-heading text-center">

              <h2>New Arrivals</h2>

            </div>

          </div>

        </div>

        <div className="row">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}