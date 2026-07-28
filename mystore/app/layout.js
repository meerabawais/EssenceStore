import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "./providers/CartProvider";
import { AuthProvider } from "@/context/AuthContext";
import "../assets/css/core-style.css";

export const metadata = {
  title: "Essence Store",
  description: "Fashion Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
      <CartProvider>

        <Navbar />

        {children}
        <Footer/>

      </CartProvider>
      </AuthProvider>
      </body>
    </html>
  );
}