import Image from "next/image";

export default function Brands() {
  const brands = [
    "/img/core-img/brand1.png",
    "/img/core-img/brand2.png",
    "/img/core-img/brand3.png",
    "/img/core-img/brand4.png",
    "/img/core-img/brand5.png",
    "/img/core-img/brand6.png",
  ];

  return (
    <div className="brands-area d-flex align-items-center justify-content-between">

      {brands.map((brand, index) => (
        <div className="single-brands-logo" key={index}>
          <Image
            src={brand}
            alt="brand"
            width={120}
            height={60}
          />
        </div>
      ))}

    </div>
  );
}