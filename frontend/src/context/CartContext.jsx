import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage on first render
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("vayre_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("vayre_cart", JSON.stringify(items));
  }, [items]);

  // A cart line is identified by product + size + color
  const makeKey = (productId, size, color) => `${productId}-${size}-${color}`;

  const addToCart = (product, variant, quantity = 1) => {
    const key = makeKey(product._id, variant.size, variant.color);

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);

      if (existing) {
        // Already in cart — increase quantity, capped at available stock
        return prev.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, variant.stock),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          key,
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0] || "",
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (key, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}