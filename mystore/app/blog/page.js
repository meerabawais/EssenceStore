import BreadCrumb from "@/components/layout/BreadCrumb";
import BlogSidebar from "@/components/blog/BlogSidebar";

export default function BlogPage() {
  return (
    <>
      <BreadCrumb />

      <section className="blog_area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <BlogSidebar />
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <p>No blog posts yet — check back soon.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
