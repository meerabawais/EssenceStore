import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer_area clearfix">

      <div className="container">

        <div className="row">

          <div className="col-12 col-md-6">

            <div className="single_widget_area d-flex mb-30">

              <div className="footer-logo mr-50">

                <Link href="/">
                  <Image
                    src="/img/core-img/logo2.png"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </Link>

              </div>

              <div className="footer_menu">

                <ul>
                  <li><Link href="/shop">Shop</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-12 col-md-6">

            <div className="single_widget_area mb-30">

              <ul className="footer_widget_menu">

                <li><Link href="#">Order Status</Link></li>
                <li><Link href="#">Payment Options</Link></li>
                <li><Link href="#">Shipping</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>

              </ul>

            </div>

          </div>

        </div>

        <div className="row align-items-end">

          <div className="col-12">

            <div className="footer-content mb-30">

              <div className="copywrite-text">

                <p>
                  © {new Date().getFullYear()} Essence Store. All rights
                  reserved.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}