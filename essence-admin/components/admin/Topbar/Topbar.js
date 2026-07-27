"use client";

import {Link} from "next/link";
import {usePathname} from "next/navigation";
import "./Topbar.css";
import {
  FaBars,
  FaSearch,
  FaMoon,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";

export default function Topbar({ toggleSidebar }){
    return(
          <header className="topbar">
      <div className="topbar-left">

        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <h4>Home</h4>

      </div>

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search pages or run a command..."
        />
      </div>

      <div className="topbar-right">

        <button className="docs-btn">
            Docs
        </button>

        <FaMoon className="icon"/>

        <div className="notification">

            <FaBell className="icon"/>

            <span></span>

        </div>

        <FaEnvelope className="icon"/>

        <div className="profile">
            E
        </div>

      </div>

    </header>
  );
}
