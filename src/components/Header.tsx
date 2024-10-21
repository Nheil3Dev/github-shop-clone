"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { CATEGORIES, COLLECTIONS } from "@/lib/constants";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { TopHeader } from "./TopHeader";

export const Header = () => {
  const { toggleCart, cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const linkStyle =
    "text-gray-500 dark:text-gray-300 font-semibold hover:underline hover:text-blue-400";

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
        <div className="flex justify-between w-full bg-white dark:bg-gray-900 py-6 lg:container lg:mx-auto">
          <div className="flex align-middle gap-10">
            <Link href="/">
              <p className="text-xl text-black dark:text-white font-extrabold ml-4">
                {`The NheiL's Shop`}
              </p>
            </Link>
            <nav className="hidden md:flex">
              <ul className="flex gap-4">
                <li className="group relative">
                  <Link
                    className="font-semibold hover:text-blue-400"
                    href="/categories"
                  >
                    Shop all
                  </Link>

                  <ul className="hidden group-hover:flex flex-col gap-2 px-5 py-4 border border-gray-300 dark:border-gray-500 rounded-lg absolute w-48 bg-white dark:bg-gray-900 top-8 -left-4">
                    {CATEGORIES.map((category, index) => (
                      <li key={index}>
                        <Link className={`${linkStyle}`} href={category.href}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="group relative">
                  <Link
                    className="font-semibold hover:text-blue-400"
                    href="/collections"
                  >
                    Collections
                  </Link>

                  <ul className="hidden group-hover:flex flex-col gap-2 px-5 py-4 border border-gray-300 dark:border-gray-500 rounded-lg absolute w-60 bg-white dark:bg-gray-900 top-8 -left-2">
                    {COLLECTIONS.map((collection, index) => (
                      <li key={index}>
                        <Link className={`${linkStyle}`} href={collection.href}>
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link
                    className="font-semibold hover:text-blue-400"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4 mr-4">
            <button
              onClick={toggleCart}
              className="flex gap-2 px-1 border rounded-lg border-transparent text-black dark:text-white hover:border-black dark:hover:border-white hover:text-gray-400"
            >
              <ShoppingCartIcon height={20} className="" />
              {cart.length > 0 && (
                <span>{cart.reduce((acc, curr) => curr.qty + acc, 0)}</span>
              )}
            </button>
            <SearchForm />
          </div>
        </div>
      </header>
    </>
  );
};
