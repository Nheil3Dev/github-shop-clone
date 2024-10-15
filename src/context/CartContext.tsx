"use client";

import { CartItem } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartContextProps {
  cart: CartItem[];
  deleteCartItem: (id: string) => void;
  addCartItem: (product: CartItem) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Cart Actions
  const deleteCartItem = (id: string) => {
    const newCart = cart.filter((product) => product?.id !== id);
    setCart(newCart);
  };

  const addCartItem = (product: CartItem) => {
    // Comprobamos si el producto ya está en el carrito
    const index = cart.findIndex((item) => item.id === product.id);
    let newCart;
    if (index !== -1) {
      // Si el producto ya existe en el carrito, actualizamos la cantidad
      newCart = [...cart];
      newCart[index].qty += product.qty; // O cualquier otra lógica que necesites
    } else {
      // Si el producto no está en el carrito, lo agregamos
      newCart = [...cart, product];
    }
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
