"use client";

import { deleteCartStrapi } from "@/lib/delete-cart";
import { getCart } from "@/lib/get-cart";
import { addToCartStrapi } from "@/lib/post-cart";
import { updateCartStrapi } from "@/lib/update-cart";
import { CartProduct } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextProps {
  cart: CartProduct[];
  deleteCartItem: (id: string) => void;
  addCartItem: (product: CartProduct) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Comprobamos que tenga un id de carrito y si no se le asigna uno
    const cartId = sessionStorage?.getItem("cartId");
    if (!cartId) {
      sessionStorage.setItem("cartId", crypto.randomUUID());
      // Si tiene id de carrito nos traemos los objetos
    } else {
      getCart(cartId).then((res) => setCart(res));
    }
  }, []);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Cart Actions

  const deleteCartItem = async (documentId: string) => {
    const res = await deleteCartStrapi(documentId);

    if (res) {
      const newCart = cart.filter(
        (product) => product?.documentId !== documentId
      );
      setCart(newCart);
    }
  };

  const addCartItem = async (product: CartProduct) => {
    // Comprobamos si el producto ya está en el carrito
    const index = cart.findIndex(
      (item) => item.variantId === product.variantId
    );
    let newCart;
    if (index !== -1) {
      // Si el producto ya existe en el carrito, actualizamos la cantidad
      const newQty = cart[index].qty + product.qty;
      await updateCartStrapi(cart[index].documentId as string, newQty);
      // Actualizamos el estado
      newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
      setIsCartOpen(true);
    } else {
      // Si el producto no está en el carrito, lo agregamos
      const response = await addToCartStrapi(
        product.variantId as string,
        product.qty,
        sessionStorage.getItem("cartId") as string
      );

      if (response.data) {
        newCart = [
          ...cart,
          { ...product, documentId: response.data.documentId },
        ];
        setCart(newCart);
        setIsCartOpen(true);
      }
    }
  };

  const clearCart = async () => {
    const promises = cart.map((item) =>
      deleteCartItem(item.documentId as string)
    );
    await Promise.all(promises);
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
