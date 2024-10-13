"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { LanguageSelector } from "./LanguageSelector";

export const Header = () => {
  const { toggleCart, cart } = useCart();
  return (
    <header>
      <div className="h-9 flex items-center bg-black text-white dark:bg-gray-200 dark:text-gray-900">
        <div className="container mx-auto">
          <LanguageSelector />
        </div>
      </div>
      <div className="flex justify-between dark:bg-gray-900 py-6 container md:mx-auto">
        <Link href="/">
          <p className="text-black dark:text-white font-extrabold ml-4">
            {`The NheiL's Shop`}
          </p>
        </Link>
        <button className="flex gap-2 px-1 border rounded-lg border-transparent text-black dark:text-white hover:border-black dark:hover:border-white hover:text-gray-400">
          <ShoppingCartIcon height={20} className="" onClick={toggleCart} />
          {cart.length > 0 && <span>{cart.length}</span>}
        </button>
      </div>
    </header>
  );
};
