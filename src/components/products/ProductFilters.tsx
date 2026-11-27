
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { SlidersHorizontal, Star, RotateCcw } from 'lucide-react'

interface ProductFiltersProps {
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
  selectedRating: number
  setSelectedRating: Dispatch<SetStateAction<number>>
  priceRange: { min: number; max: number }
  setPriceRange: Dispatch<SetStateAction<{ min: number; max: number }>>
}

const categories = [
  'All',
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories',
  'motorcycle',
  'skin-care',
  'smartphones',
  'sports-accessories',
  'sunglasses',
  'tablets',
  'tops',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
]

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
}: ProductFiltersProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false)

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6)

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedRating(0)
    setPriceRange({ min: 0, max: 3000 })
    setShowAllCategories(false)
  }

  return (
    <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.06)]">


      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <RotateCcw size={14} />
          Clear all
        </button>
      </div>

      {/* Category Filter */}
      <div className="border-t border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Categories
        </h3>

        <div className="flex flex-col gap-3">
          {visibleCategories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="capitalize">
                {category.replaceAll('-', ' ')}
              </span>
            </label>
          ))}
        </div>

        {/* View All / Show Less */}
        <button
          type="button"
          onClick={() => setShowAllCategories((prev) => !prev)}
          className="mt-4 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          {showAllCategories ? 'Show less' : 'View all categories'}
        </button>
      </div>

      {/* Rating Filter */}
      <div className="border-t border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Customer Rating
        </h3>

        <div className="flex flex-col gap-3">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600"
            >
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="flex items-center gap-1">
                {rating} & above
                <Star
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              </span>
            </label>
          ))}

          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-blue-600">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === 0}
              onChange={() => setSelectedRating(0)}
              className="h-4 w-4 accent-blue-600"
            />
            All ratings
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="border-t border-gray-100 py-5">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Price Range
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="min-price"
              className="mb-2 block text-xs font-medium text-gray-500"
            >
              Minimum
            </label>

            <input
              id="min-price"
              type="number"
              min={0}
              value={priceRange.min}
              onChange={(e) => {
                const min = Math.max(0, Number(e.target.value))

                setPriceRange((prev) => ({
                  ...prev,
                  min: Math.min(min, prev.max),
                }))
              }}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="max-price"
              className="mb-2 block text-xs font-medium text-gray-500"
            >
              Maximum
            </label>

            <input
              id="max-price"
              type="number"
              min={0}
              value={priceRange.max}
              onChange={(e) => {
                const max = Math.max(0, Number(e.target.value))

                setPriceRange((prev) => ({
                  ...prev,
                  max: Math.max(max, prev.min),
                }))
              }}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Showing products within your selected price range.
        </p>
      </div>
    </aside>
  )
}

export default ProductFilters
