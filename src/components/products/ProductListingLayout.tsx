import { useState } from "react";
import type { Product } from "../../types/product";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

interface ProductListingLayoutProps {
  products: Product[];
  loading: boolean;
  error: string | null;

  addToCart: (product: Product) => void;

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  selectedRating: number;
  setSelectedRating: React.Dispatch<React.SetStateAction<number>>;

  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;

  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductListingLayout({
  products,
  loading,
  error,
  addToCart,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
}: ProductListingLayoutProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="py-6">
  
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Discover Our Products
          </h1>

          <p className="mt-2 text-gray-500">
            Find products that match your needs.
          </p>
        </div>

      
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="whitespace-nowrap text-sm font-medium text-gray-600"
          >
            Sort by:
          </label>

          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="default">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="rounded-lg border px-4 py-2 text-sm font-medium"
        >
          {showFilters ? "Close Filters" : "Show Filters"}
        </button>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">

        <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        {/* Products */}
        <main className="min-w-0">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            addToCart={addToCart}
          />
        </main>
      </div>
    </section>
  );
}
