import { FaRegHeart } from "react-icons/fa";
import BreadCrumb from "@/components/layout/BreadCrumb";

export default function WishlistPage() {
  return (
    <>
      <BreadCrumb />

      <section className="wishlist_area section-padding-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6 text-center">
              <FaRegHeart size={48} />
              <h3 className="mt-3">Your wishlist is empty</h3>
              <p>Items you save will show up here.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
