import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { AppLayout } from './components/layout/AppLayout'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { ProductDetails } from './pages/ProductDetails'


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Toaster position="top-right" />

        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}


export default App