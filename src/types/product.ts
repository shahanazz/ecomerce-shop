
export interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  originalPrice: number
  image: string
  rating: number
}

export interface ProductsResponse {
  products: {
    id: number
    title: string
    category: string
    description: string
    price: number
    discountPercentage: number
    thumbnail: string
    rating: number
  }[]
  total: number
  skip: number
  limit: number
}


export interface CartItem extends Product {
  quantity: number
}