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
  cartId: string;
  cart: CartProduct[];
  deleteCartItem: (product: CartProduct) => void;
  addCartItem: (product: CartProduct) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  total: number;
  modifyQty: (product: CartProduct, qty: number) => void;
  modifyAllQty: (
    products: {
      documentId: string;
      qty: number;
      diff: number;
    }[]
  ) => void;
  editProductCart: (product: CartProduct) => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Comprobamos que tenga un id de carrito y si no se le asigna uno
    const cartId = sessionStorage?.getItem("cartId");
    if (!cartId) {
      const newCartId = crypto.randomUUID();
      sessionStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
      // Si tiene id de carrito nos traemos los objetos
    } else {
      setCartId(cartId);
      getCart(cartId).then((res) => {
        if (res) {
          setCart(res);
          const newTotal: number = res
            .reduce(
              (acc: number, cur: CartProduct) => acc + cur.price * cur.qty,
              0
            )
            .toFixed(2);
          setTotal(Number(newTotal));
        }
      });
    }
  }, []);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Cart Actions

  const deleteCartItem = async (product: CartProduct) => {
    const { documentId, price, qty } = product;
    const res = await deleteCartStrapi(documentId as string);

    if (res) {
      const newCart = cart.filter(
        (product) => product?.documentId !== documentId
      );
      setCart(newCart);
      const newTotal = Number((total - price * qty).toFixed(2));
      setTotal(newTotal);
    }
  };

  const addCartItem = async (product: CartProduct) => {
    const { variantId, price, qty } = product;
    // Comprobamos si el producto ya está en el carrito
    const index = cart.findIndex((item) => item.variantId === variantId);
    let newCart;

    // Si el producto ya existe en el carrito, actualizamos la cantidad
    if (index !== -1) {
      const newQty = cart[index].qty + qty;
      const data = {
        quantity: newQty,
      };

      // Actualizamos Server
      await updateCartStrapi(cart[index].documentId as string, data);

      // Actualizamos Interfaz
      newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);

      setIsCartOpen(true);

      // Si el producto no está en el carrito, lo agregamos
    } else {
      //Actualizamos Server
      const response = await addToCartStrapi(variantId as string, qty, cartId);

      // Si se crea nos devuelve el identificador unico del carrito para ese producto
      if (response.data) {
        // Actualizamos interfaz
        newCart = [
          ...cart,
          { ...product, documentId: response.data.documentId },
        ];
        setCart(newCart);
        setIsCartOpen(true);
      }
    }
    const newTotal = Number((total + price * qty).toFixed(2));
    setTotal(newTotal);
  };

  // TODO: COMPROBAR EL STOCK, para que no te deje aumentar la cantidad
  const modifyQty = async (product: CartProduct, qty: number) => {
    if (product.qty === 1 && qty < 0) {
      return deleteCartItem(product);
    }
    // Comprobamos si el producto ya está en el carrito
    const index = cart.findIndex(
      (item) => item.documentId === product.documentId
    );
    // Si el producto ya existe en el carrito, actualizamos la cantidad
    const newQty = cart[index].qty + qty;
    const data = {
      quantity: newQty,
    };

    // Actualizamos server
    await updateCartStrapi(cart[index].documentId as string, data);

    // Actualizamos la interfaz
    const newCart = [...cart];
    newCart[index].qty = newQty;
    setCart(newCart);

    const newTotal = Number((total + product.price * qty).toFixed(2));
    setTotal(newTotal);
  };

  const modifyAllQty = async (
    products: {
      documentId: string;
      qty: number;
      diff: number;
    }[]
  ) => {
    const promises = products
      .filter((product) => product.diff !== 0)
      .map((product) => {
        const data = {
          quantity: product.qty,
        };
        return updateCartStrapi(product.documentId, data);
      });

    // Actualizamos server
    await Promise.all(promises);

    // Actualizamos interfaz
    const newCart = cart.map((item, index) => {
      if (products[index].diff === 0) {
        return { ...item };
      }
      return {
        ...item,
        qty: products[index].qty,
      };
    });

    setCart(newCart);

    const newTotal = newCart
      .reduce((acc: number, cur: CartProduct) => acc + cur.price * cur.qty, 0)
      .toFixed(2);
    setTotal(Number(newTotal));
  };

  const clearCart = async () => {
    const promises = cart.map((item) =>
      deleteCartStrapi(item.documentId as string)
    );

    // Actualizamos Server
    await Promise.all(promises);

    // Actualizamos interfaz
    setCart([]);
    setTotal(0);
  };

  const editProductCart = async (product: CartProduct) => {
    const data = {
      product_variant: product.variantId,
      quantity: product.qty,
    };

    // Actualizamos Server
    await updateCartStrapi(product.documentId as string, data);

    // Actualizamos la interfaz
    const newCart = [...cart];
    const index = cart.findIndex(
      (item) => item.documentId === product.documentId
    );
    newCart[index] = { ...product };
    setCart(newCart);

    const newTotal = newCart
      .reduce((acc: number, cur: CartProduct) => acc + cur.price * cur.qty, 0)
      .toFixed(2);
    setTotal(Number(newTotal));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cart,
        cartId,
        deleteCartItem,
        addCartItem,
        clearCart,
        total,
        modifyQty,
        modifyAllQty,
        editProductCart,
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
