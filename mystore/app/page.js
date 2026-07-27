import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import CTASection from "@/components/Home/CTASection";
import NewArrivals from "@/components/Home/NewArrivals";
import Brands from "@/components/Home/Brands";
import Newsletter from "@/components/Home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <Categories />

      <CTASection />

      <NewArrivals />
       <Brands />
      <Newsletter />

    </>
  );
}