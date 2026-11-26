import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem } from "../types/product";
import toast from "react-hot-toast";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const MAX_ITEM_QUANTITY = 10;

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");

    try {
      return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // Persist cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product or increase its quantity
const addToCart = (product: Product, quantity = 1) => {
  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  const currentQuantity = existingItem?.quantity ?? 0;

  // Check maximum quantity
  if (currentQuantity + quantity > MAX_ITEM_QUANTITY) {
    toast.error(`Maximum ${MAX_ITEM_QUANTITY} items allowed per product`);
    return;
  }

  setCartItems((prevItems) => {
    const existing = prevItems.find(
      (item) => item.id === product.id
    );

    if (existing) {
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [...prevItems, { ...product, quantity }];
  });

  toast.success(`${product.name} added to cart!`);
};

  // Update product quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    if (quantity > MAX_ITEM_QUANTITY) {
      toast.error("Maximum 10 items allowed per product");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Remove one product
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );

    toast.success("Product removed from cart");
  };

  // Empty the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  // Total quantity of all products
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
