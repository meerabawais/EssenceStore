import products from "@/data/Products";
import ProductCard from "../Home/ProductCard";

export default function ProductGrid() {
  return (
    <>
      <h3 className="mb-4">Products Available</h3>

      <div className="row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}