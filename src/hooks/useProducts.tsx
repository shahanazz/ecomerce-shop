import { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductServices'
import type { Product } from '../types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getProducts()

        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Unable to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}