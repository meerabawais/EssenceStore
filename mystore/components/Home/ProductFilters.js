"use client";

export default function ProductFilters({ activeFilter, setActiveFilter }) {
  const filters = [
    "All",
    "Popular",
    "Recommended",
    "Best Selling",
  ];

  return (
    <div className="popular-products-slides owl-carousel">
      <div className="product-topbar d-xl-flex align-items-end justify-content-between">
        <div className="total-products">
          <p>
            <span>186</span> products found
          </p>
        </div>

        <div className="product-sorting d-flex">
          <div className="sort-by-date mr-15">
            <select className="custom-select">
              <option>Sort by Newest</option>
              <option>Sort by Popularity</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>

          <div className="view-product">
            <select className="custom-select">
              <option>12</option>
              <option>24</option>
              <option>36</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-center mb-50">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`btn mx-2 ${
              activeFilter === filter
                ? "essence-btn"
                : "btn-outline-secondary"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}