import axios from 'axios'

import type { Product, ProductsResponse } from '../types/product'

const API_URL = 'https://dummyjson.com'

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ProductsResponse>(
    `${API_URL}/products?limit=12`
  )

  const products = response.data.products

  return products.map((item) => {
    const originalPrice = item.price

    const discountedPrice =
      originalPrice * (1 - item.discountPercentage / 100)

    return {
      id: item.id,
      name: item.title,
      category: item.category,
      description: item.description,
      price: Number(discountedPrice.toFixed(2)),
      originalPrice:
        item.discountPercentage > 0
          ? originalPrice
          : undefined,
      image: item.thumbnail,
      rating: item.rating,
    }
  })
}