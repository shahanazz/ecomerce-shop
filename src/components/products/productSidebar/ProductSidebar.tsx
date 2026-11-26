
import { SlidersHorizontal, RotateCcw } from 'lucide-react'

export const ProductSidebar = () => {
  const categories = [
    'All Products',
    'Electronics',
    'Clothing',
    'Jewellery',
    'Accessories',
  ]

  const priceRanges = [
    'Under ₹500',
    '₹500 - ₹1,000',
    '₹1,000 - ₹5,000',
    'Above ₹5,000',
  ]

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-5">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={19} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Filters
          </h2>
        </div>

        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-800">
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Categories
        </h3>

        <div className="space-y-3">
          {categories.map((category, index) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
            >
              <input
                type="radio"
                name="category"
                defaultChecked={index === 0}
                className="h-4 w-4 accent-blue-600"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Price Range
        </h3>

        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label
              key={range}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-blue-600"
              />
              <span>{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div className="pt-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Customer Rating
        </h3>

        <div className="space-y-3">
          {[4, 3, 2].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-amber-400">
                {'★'.repeat(rating)}
                <span className="text-gray-300">
                  {'★'.repeat(5 - rating)}
                </span>
              </span>

              <span className="text-gray-500">
                & above
              </span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  )
}

export default ProductSidebar
