import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";

interface ProductDetailsResponse {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  rating: number;
  brand?: string;
  stock: number;
  images: string[];
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
}

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Unable to find this product.");
        }

        const data: ProductDetailsResponse = await response.json();

        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
        setQuantity(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-gray-100" />
          <div className="space-y-5 py-8">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-8 w-36 rounded bg-gray-200" />
            <div className="h-24 rounded bg-gray-100" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <p className="mt-3 text-gray-500">
          {error || "This product is unavailable."}
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={17} />
          Back to shop
        </Link>
      </div>
    );
  }

  const cartProduct: Product = {
    id: product.id,
    name: product.title,
    category: product.category,
    description: product.description,
    price: product.price,
    originalPrice: Number(
      (product.price / (1 - product.discountPercentage / 100)).toFixed(2),
    ),
    image: product.thumbnail,
    rating: product.rating,
  };

  const discount = Math.round(product.discountPercentage);
  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  const isInStock = product.stock > 0;

  const handleAddToCart = () => {
    addToCart(cartProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(cartProduct, quantity);
    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="max-w-[180px] truncate font-medium text-gray-700">
            {product.title}
          </span>
        </nav>

        {/* Main Product Section */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Gallery */}
          <div>
            <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-8 sm:p-12">
              {discount > 0 && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">
                  {discount}% OFF
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              <button
                type="button"
                aria-label="Wishlist"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:text-red-500"
              >
                <Heart size={19} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 bg-gray-50 p-2 transition ${
                      selectedImage === image
                        ? "border-blue-600"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col py-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              {product.category}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>

            {product.brand && (
              <p className="mt-3 text-sm text-gray-500">
                Brand:{" "}
                <span className="font-semibold text-gray-800">
                  {product.brand}
                </span>
              </p>
            )}

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-gray-800">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-400">Customer rating</span>
            </div>

            <div className="my-7 border-t border-gray-100" />

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  ${product.price.toFixed(2)}
                </span>

                {cartProduct.originalPrice !== undefined && discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${cartProduct.originalPrice.toFixed(2)}
                    </span>

                    <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Inclusive of applicable taxes
              </p>
            </div>

            {/* Description */}
            <p className="mt-7 text-sm leading-7 text-gray-600 sm:text-base">
              {product.description}
            </p>

            {/* Availability */}
            <div className="mt-7 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isInStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-700" : "text-red-600"
                }`}
              >
                {isInStock
                  ? product.availabilityStatus || "In stock"
                  : "Out of stock"}
              </span>
              {isInStock && (
                <span className="text-sm text-gray-400">
                  ({product.stock} available)
                </span>
              )}
            </div>

            {/* Quantity and Cart Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                <span className="w-9 text-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => Math.min(product.stock, prev + 1))
                  }
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                  className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </div>

            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!isInStock}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
              <ArrowRight size={17} />
            </button>

            {/* Service Information */}
            <div className="mt-8 space-y-4 rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <Truck size={20} className="mt-0.5 shrink-0 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Delivery Information
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {product.shippingInformation ||
                      "Shipping information available at checkout."}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-gray-500"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Warranty & Returns
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {product.warrantyInformation ||
                      "Warranty information not available."}
                    {product.returnPolicy && ` ${product.returnPolicy}`}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-start gap-3">
                <Check size={20} className="mt-0.5 shrink-0 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Secure Shopping
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Your order details are handled securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description Section */}
        <section className="mt-20 border-t border-gray-100 pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Product Details
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
            {product.description}
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Continue shopping
          </Link>
        </section>
      </div>
    </main>
  );
};
