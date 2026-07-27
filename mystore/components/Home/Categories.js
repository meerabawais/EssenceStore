import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  const categories = [
    {
      title: "Clothing",
      image: "/img/bg-img/cat1.jpg",
      link: "/shop",
    },
    {
      title: "Shoes",
      image: "/img/bg-img/cat2.jpg",
      link: "/shop",
    },
    {
      title: "Accessories",
      image: "/img/bg-img/cat3.jpg",
      link: "/shop",
    },
  ];

  return (
    <section className="top_catagory_area section-padding-80 clearfix">
      <div className="container">
        <div className="row justify-content-center">
          {categories.map((category, index) => (
            <div
              className="col-12 col-sm-6 col-md-4"
              key={index}
            >
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  style={{
                    objectFit: "cover",
                    zIndex: -1,
                  }}
                />

                <div className="catagory-content">
                  <Link href={category.link}>
                    {category.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}