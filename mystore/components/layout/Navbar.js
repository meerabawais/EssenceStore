"use client";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaHeart, FaUser, FaShoppingBag } from "react-icons/fa";
import Cartsidebar from "./Cartsidebar";
import Dropdown from "../Home/Dropdown";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const[pages,showPages] = useState(false);
  const[isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  return (
    <>
    <header className="header_area">
      <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">

        <nav className="classy-navbar">

          <Link href="/" className="nav-brand ">
            <Image
              src="/img/core-img/logo.png"
              alt="Logo"
              width={80}
              height={15}
            />
          </Link>

         
          <div className="classy-navbar-toggler">
            <span className="navbarToggler">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

         
          <div className="classy-menu">

            <div className="classycloseIcon">
              <div className="cross-wrap">
                <span className="top"></span>
                <span className="bottom"></span>
              </div>
            </div>

            <div className="classynav">

        <ul className="classynav">
  <Dropdown />

                <li>
    <Link href="/pages">Pages</Link>
</li>

                <li>
                  <Link href="/blog">Blog</Link>
                </li>

                <li>
                  <Link href="/contact">Contact</Link>
                </li>

              </ul>

            </div>

          </div>

        </nav>

        <div className="header-meta d-flex clearfix justify-content-end">

          <div className="search-area">
    <form>
        <input
            type="search"
            placeholder="Type for search"
        />
        <button type="submit">
            <FaSearch />
        </button>
    </form>
</div>

          <div className="favourite-area">
            <Link href="/wishlist">
              <FaHeart />
            </Link>
          </div>

          <div className="user-login-info">
            <Link href={user ? "/user/dashboard" : "/account/login"}>
              <FaUser />
            </Link>
          </div>

          <div
     className="cart-area"
     onClick={() => setIsCartOpen(true)}>
    <FaShoppingBag />
       <span>3</span>
      </div>

        </div>

      </div>
    </header>
    <Cartsidebar isopen={isCartOpen} onclose={()=> setIsCartOpen(false)}></Cartsidebar>
  </>
  );
}