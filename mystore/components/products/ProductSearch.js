"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearch() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  function handleSubmit(e) {

    e.preventDefault();

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
      </button>

    </form>
  );
}