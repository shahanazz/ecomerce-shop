
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from 'lucide-react'

import { useCart } from '../context/CartContext'

export const Cart = () => {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // For now, shipping is free
  const shipping = 0

  const total = subtotal + shipping

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* Page heading */}
      <div className="mb-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            <p className="mt-2 text-gray-500">
              Review your items before checkout.
            </p>
          </div>

          {cartItems.length > 0 && (
            <p className="text-sm font-medium text-gray-500">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      {/* Empty cart */}
      {cartItems.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <ShoppingBag size={34} className="text-blue-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you love.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Start Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* Cart products */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Cart Items
              </h2>

              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-500 transition hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
                >
                  {/* Product image */}
                  <Link
                    to={`/products/${item.id}`}
                    className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-3 sm:h-28 sm:w-28"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  {/* Product information */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {item.category}
                    </p>

                    <Link
                      to={`/products/${item.id}`}
                      className="mt-1 block truncate text-base font-semibold text-gray-900 transition hover:text-blue-600"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-2 text-gray-600 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                     <button
  onClick={() => updateQuantity(item.id, item.quantity + 1)}
  disabled={item.quantity >= 10}
  aria-label="Increase quantity"
  className="p-2 text-gray-600 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
>
  <Plus size={15} />
</button>

{/* {item.quantity >= 10 && (
  <p className="mt-2 text-xs text-amber-600">
    Maximum 10 items allowed
  </p>
)} */}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-red-500"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item total */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
                    <p className="text-xs text-gray-400 sm:mb-1">
                      Item total
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal ({cartCount} items)
                </span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Taxes and other charges, if applicable, are not included.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                // Checkout will be implemented later
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Proceed to Checkout
              <ArrowRight size={17} />
            </button>

            <Link
              to="/"
              className="mt-4 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShoppingBag size={15} />
              Secure shopping experience
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
