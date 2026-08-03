"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaTachometerAlt,
  FaWpforms,
  FaTable,
  FaShoppingCart,
  FaUserShield,
  FaChevronDown,
  FaComment
} from "react-icons/fa";

import {
  MdOutlineInventory2,
  MdReceiptLong,
} from "react-icons/md";

import { HiOutlineViewGrid } from "react-icons/hi";
import "./Sidebar.css";
export default function Sidebar({isOpen}) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-logo">
        <h2>ESSENCE</h2>
        <span>Admin Panel</span>
      </div>

      <nav>

        {/* Dashboard */}

        <div className="sidebar-section">

          <div className="sidebar-title">

            <FaTachometerAlt />

            <span>Dashboard</span>

            <FaChevronDown className="arrow"/>

          </div>

          <Link
            href="/Operations"
            className={isActive("/Operations") ? "active" : ""}
          >
            Operations
          </Link>

        </div>

        {/* Forms */}

        <div className="sidebar-section">

          <div className="sidebar-title">

            <FaWpforms />

            <span>Forms</span>

            <FaChevronDown className="arrow"/>

          </div>

          <Link
            href="/Form"
            className={isActive("/admin/forms") ? "active" : ""}
          >
            General
          </Link>

        </div>

        {/* Tables */}

        <div className="sidebar-section">

          <div className="sidebar-title">

            <FaTable />

            <span>Tables</span>

            <FaChevronDown className="arrow"/>

          </div>

          <Link
            href="/customers"
            className={
              isActive("/customers") ? "active" : ""
            }
          >
            Static
          </Link>

        </div>

        {/* Ecommerce */}

        <div className="sidebar-section">

          <div className="sidebar-title">

            <FaShoppingCart />

            <span>E-Commerce</span>

            <FaChevronDown className="arrow"/>

          </div>

          <Link
            href="/products"
            className={
              isActive("/products") ? "active" : ""
            }
          >
            <MdOutlineInventory2 />
            Products
          </Link>

          <Link
    href="/Categories"
    className={isActive("/Categories") ? "active" : ""}
>
    <HiOutlineViewGrid />
    Categories
</Link>
          <Link
            href="/Orders"
            className={
              isActive("/Orders") ? "active" : ""
            }
          >
            <MdReceiptLong />
            All Orders
          </Link>

          <Link
            href="/chat"
            className={
              isActive("/chat") ? "active" : ""
            }
          >
            <FaComment />
            Chat
          </Link>

        </div>

        {/* Admin */}

        <div className="sidebar-section">

          <div className="sidebar-title">

            <FaUserShield />

            <span>Admin</span>

            <FaChevronDown className="arrow"/>

          </div>

          <Link
            href="/profile"
            className={
              isActive("/profile") ? "active" : ""
            }
          >
            Your Profile
          </Link>

          <Link
            href="/Settings"
            className={
              isActive("/Settings") ? "active" : ""
            }
          >
            Settings
          </Link>

          <Link
            href="/logout"
            className={
              isActive("/logout") ? "active" : ""
            }
          >
            Logout
          </Link>

        </div>

      </nav>

    </aside>
  );
}