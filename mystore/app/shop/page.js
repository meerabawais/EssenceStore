import BreadCrumb from "@/components/layout/BreadCrumb";
import BlogSidebar from "@/components/blog/BlogSidebar";
import ProductGrid from "@/components/products/ProductGrid";


export default async function ShopPage({ searchParams }) {
  const params = await searchParams;

  const categoryId = params.category;
  const subCategoryId = params.subcategory;
   const search = params?.search || "";

  return (
    <>
      <BreadCrumb />

      <section className="shop_grid_area section-padding-80">
        <div className="container">
          <div className="row">

            <div className="col-12 col-md-4 col-lg-3">
              <BlogSidebar />
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <ProductGrid
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                search={search}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}