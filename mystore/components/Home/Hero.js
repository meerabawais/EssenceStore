import Link from "next/link";

export default function Hero(){
    return(
        <section className="hero-section"
            style={{
        backgroundImage: "url('/img/bg-img/bg-1.jpg')",
      }}
      >
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-subtitle">NEW COLLECTION</span>

          <h1 className="hero-title">
            Summer Fashion
          </h1>

          <p className="hero-text">
            Discover premium clothing designed for comfort, elegance, and
            everyday style.
          </p>

          <Link href="/shop" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>
        </section>
    );
}