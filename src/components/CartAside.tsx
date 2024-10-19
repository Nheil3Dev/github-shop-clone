"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { CartItem } from "./CartItem";

export const CartAside = () => {
  const { isCartOpen, toggleCart, cart, total } = useCart();

  return (
    <aside
      className={`z-30 w-80 flex flex-col h-screen fixed top-0 right-0 border-l border-gray-800 dark:border-l-white ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform`}
    >
      {/* Contenido del carrito */}
      <header className="flex items-center justify-end text-white bg-gray-800 dark:bg-white dark:text-black h-10 w-full">
        <button className="mr-3 font-bold text-xs" onClick={toggleCart}>
          Close
        </button>
      </header>
      <main className="flex-1 bg-white dark:bg-gray-900 overflow-auto">
        <div className="h-full flex flex-col justify-between">
          <div>
            {cart.length === 0 && (
              <p className="text-xs text-center mt-4">
                You have no items in your shopping cart.
              </p>
            )}
            {cart.map((product) => (
              <CartItem key={product.documentId} product={product} />
            ))}
          </div>
          {cart.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="flex justify-between p-4 bg-gray-200 text-gray-800 text-sm">
                <p>Cart subtotal:</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Link
                onClick={toggleCart}
                href={"/checkout/cart"}
                className="text-xs m-3 text-center hover:underline hover:text-blue-400 cursor-pointer"
              >
                View and edit cart
              </Link>
              <button className="mx-4 mb-4 flex justify-center py-2 font-bold bg-black dark:bg-white text-white dark:text-black rounded-md border border-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white dark:hover:border-white transition-all duration-300 ease-in-out">
                Go to checkout
              </button>
            </div>
          )}
        </div>
      </main>
    </aside>
  );
};
