
import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from 'lucide-react'
import { useCart } from '../../context/CartContext'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { cartCount } = useCart()
  const navigate = useNavigate()
const [, setSearchParams] = useSearchParams()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/' },
    { name: 'Categories', path: '/#categories' },
    { name: 'About', path: '/#about' },
  ]

  // Handle product search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const query = searchQuery.trim()

    if (!query) return

    navigate(`/?search=${encodeURIComponent(query)}`)
    setIsMenuOpen(false)
  }

  const handleClearSearch = () => {
  setSearchQuery('')
  setSearchParams({})
}

  return (
    <header className="sticky top-0 z-50 bg-white">

      {/* Announcement Bar */}
      <div className="bg-blue-600 px-4 py-2 text-center text-xs font-medium text-white">
        Free shipping on orders above ₹999
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Shop<span className="text-blue-600">Ease</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Search */}
          <form
  onSubmit={handleSearch}
  className="hidden max-w-xs flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-blue-500 sm:flex"
>
  <button type="submit" aria-label="Search products">
    <Search size={18} className="shrink-0 text-gray-400" />
  </button>

<input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search products..."
  className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
/>

  {/* Clear Search Button */}
  {searchQuery && (
    <button
      type="button"
      onClick={handleClearSearch}
      aria-label="Clear search"
      className="ml-2 text-gray-400 transition hover:text-gray-700"
    >
      <X size={16} />
    </button>
  )}
</form>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-4">

            {/* Account */}
            <button
              aria-label="Account"
              className="hidden text-gray-600 transition hover:text-blue-600 sm:block"
            >
              <UserRound size={22} strokeWidth={1.8} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative text-gray-700 transition hover:text-blue-600"
            >
              <ShoppingCart size={23} strokeWidth={1.8} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="text-gray-700 lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 sm:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-blue-500"
          >
            <button type="submit" aria-label="Search products">
              <Search size={18} className="text-gray-400" />
            </button>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
