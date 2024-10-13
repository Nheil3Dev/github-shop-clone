"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CartContextProps {
  cart: any;
  deleteCartItem: (id: string) => void;
  addCartItem: (product: any) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Cart Actions
  const deleteCartItem = (id: string) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const addCartItem = (product: any) => {
    const newCart = [...cart, product];
    setCart(newCart);
    setIsCartOpen(true);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cart,
        deleteCartItem,
        addCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
