"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { TopHeader } from "./TopHeader";

export const Header = () => {
  const { toggleCart, cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Escuchar evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-20 ${
          isScrolled ? "shadow-lg -translate-y-9" : "translate-y-0"
        } transition-all duration-300 delay-100`}
      >
        <TopHeader />
        <div className="flex justify-between bg-white dark:bg-gray-900 py-6 container md:mx-auto">
          <div className="flex align-middle gap-10">
            <Link href="/">
              <p className="text-xl text-black dark:text-white font-extrabold ml-4">
                {`The NheiL's Shop`}
              </p>
            </Link>
            <nav>
              <ul className="flex gap-3">
                <li>
                  <Link href="/categories">Shop all</Link>
                </li>
                <li>
                  <Link href="#">Collections</Link>
                </li>
                <li>
                  <Link href="#">About</Link>
                </li>
              </ul>
            </nav>
          </div>
          <button className="flex gap-2 px-1 border rounded-lg border-transparent text-black dark:text-white hover:border-black dark:hover:border-white hover:text-gray-400">
            <ShoppingCartIcon height={20} className="" onClick={toggleCart} />
            {cart.length > 0 && (
              <span>{cart.reduce((acc, curr) => curr.qty + acc, 0)}</span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
