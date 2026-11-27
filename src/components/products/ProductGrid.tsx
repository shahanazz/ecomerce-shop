
import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'
import { ProductCardSkeleton } from './ProductCardSkeleton'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  error: string | null
  addToCart: (product: Product) => void
}

const ProductGrid = ({
  products,
  loading,
  addToCart
}: ProductGridProps) => {

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

//   if (error) {
//     return (
//       <div className="py-16 text-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     )
//   }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold text-gray-800">
          No products found.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <section>
      <p className="mb-5 text-sm text-gray-500">
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {products.length}
        </span>{' '}
        products
      </p>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    addToCart={addToCart}
  />
))}
      </div>
    </section>
  )
}

export default ProductGrid
