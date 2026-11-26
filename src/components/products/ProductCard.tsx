
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types/product'
import { Link } from 'react-router-dom'

// interface ProductCardProps {
//   product: Product
// }

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) * 100
      )
    : null

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

      <div className="relative aspect-square overflow-hidden bg-gray-50 p-5">
      <Link to={`/products/${product.id}`}>
  <img
    src={product.image}
    alt={product.name}
    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
  />
</Link>

        {discount !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.category}
        </p>

    <h3 className="mt-2 truncate text-base font-semibold text-gray-900">
  <Link
    to={`/products/${product.id}`}
    className="transition hover:text-blue-600"
  >
    {product.name}
  </Link>
</h3>
        <div className="mt-3 flex items-center gap-1.5">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            Customer rating
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

<button
  onClick={() => addToCart(product)}
  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
>
  <ShoppingCart size={17} />
  Add to Cart
</button>
      </div>
    </article>
  )
}
