"use client";

import Link from "next/link";

export default function Dropdown() {
  return (
    <li className="megamenu-item">
      <Link href="/shop">Shop</Link>

      <div className="megamenu">
        <ul className="single-mega cn-col-4">
  <li className="title">Women's Collection</li>

  <li>
    <Link href="/shop">Dresses</Link>
  </li>

  <li>
    <Link href="/shop">Blouses & Shirts</Link>
  </li>

  <li>
    <Link href="/shop">T-Shirts</Link>
  </li>

  <li>
    <Link href="/shop">Rompers</Link>
  </li>

  <li>
    <Link href="/shop">Hats</Link>
  </li>
</ul>

        <ul className="single-mega cn-col-4">
          <li className="title">Men's Collection</li>
          <li><Link href="/shop">T-Shirts</Link></li>
          <li><Link href="/shop">Polo</Link></li>
          <li><Link href="/shop">Shirts</Link></li>
          <li><Link href="/shop">Jackets</Link></li>
          <li><Link href="/shop">Trench</Link></li>
        </ul>


        <ul className="single-mega cn-col-4">
          <li className="title">Kid's Collection</li>
          <li><Link href="/shop">Dresses</Link></li>
          <li><Link href="/shop">Shirts</Link></li>
          <li><Link href="/shop">T-Shirts</Link></li>
          <li><Link href="/shop">Jackets</Link></li>
          <li><Link href="/shop">Trench</Link></li>
        </ul>

        {/* Banner */}
        <div className="single-mega cn-col-4">
          <img src="/img/bg-img/bg-6.jpg" alt="Shop Banner" />
        </div>

      </div>
    </li>
  );
}