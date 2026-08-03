"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dropdown() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <li className="megamenu-item">
      <Link href="/shop">Shop</Link>

      <div className="megamenu">

        {loading ? (
          <div className="single-mega cn-col-4">
            <p>Loading...</p>
          </div>
        ) : (
          categories.map((category) => (
            <ul
              className="single-mega cn-col-4"
              key={category.id}
            >
              <li className="title">
                <Link href={`/shop?category=${category.id}`}>
                  {category.name}
                </Link>
              </li>

              {category.subCategories.map((subCategory) => (
                <li key={subCategory.id}>
                  <Link
                    href={`/shop?category=${category.id}&subcategory=${subCategory.id}`}
                  >
                    {subCategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))
        )}

        {/* Banner */}
        <div className="single-mega cn-col-4">
          <img
            src="/img/bg-img/bg-6.jpg"
            alt="Shop Banner"
          />
        </div>

      </div>
    </li>
  );
}