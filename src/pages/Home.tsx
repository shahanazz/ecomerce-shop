import { useEffect, useState } from "react";
import ProductListingLayout from "../components/products/ProductListingLayout";
import type { Product, ProductsResponse } from "../types/product";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  const [sortOption, setSortOption] = useState("default");

  // Get cart function from CartContext
  const { addToCart } = useCart();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=100",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductsResponse = await response.json();

        const formattedProducts: Product[] = data.products.map((item) => ({
          id: item.id,
          name: item.title,
          category: item.category,
          description: item.description,
          price: item.price,
          originalPrice: Number(
            (item.price / (1 - item.discountPercentage / 100)).toFixed(2),
          ),
          image: item.thumbnail,
          rating: item.rating,
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products and display maximum 12
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesRating = product.rating >= selectedRating;

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;

        case "price-high-low":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        case "name":
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    })
    .slice(0, 12);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProductListingLayout
        products={filteredProducts}
        addToCart={addToCart}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
};
