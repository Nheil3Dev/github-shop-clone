"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { CartItem } from "@/types/types";
import Image from "next/image";

export const CheckoutTable = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="mt-4">
        <p className="text-sm mb-2">You have no items in your shopping cart.</p>
        <p>
          Click{" "}
          <Link href={"/"} className="underline hover:no-underline">
            here
          </Link>{" "}
          to continue shopping.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <table className="text-gray-300">
        <thead className="">
          <tr className="border-b border-b-gray-400">
            <th className="text-left py-4 px-2">Item</th>
            <th></th>
            <th className="text-right py-4 px-2">Price</th>
            <th className="text-right py-4 px-2">Qty</th>
            <th className="text-right py-4 px-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product: CartItem) => (
            <tr key={product.id} className="border-b border-b-gray-400">
              <td className="py-4 w-3/12">
                <div className="w-1/2">
                  <Image
                    src={product.image}
                    width={200}
                    height={200}
                    alt="Product image"
                  />
                </div>
              </td>
              <td className="py-4 w-3/12 align-top">
                <div className="font-semibold">
                  <Link
                    href={product.href}
                    className="underline font-semibold text-black dark:text-gray-200 hover:no-underline"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-3 text-sm text-gray-500">
                    Size:{" "}
                    <span className="dark:text-gray-300 font-normal">
                      {product.size.toUpperCase() === "NONE"
                        ? "-"
                        : product.size}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                    Color:{" "}
                    <span className="dark:text-gray-300 font-normal">
                      {product.color.toUpperCase() === "NONE"
                        ? "-"
                        : product.color}
                    </span>
                  </p>
                </div>
              </td>
              <td className="w-1/12 py-4 px-1 align-top text-right">
                ${product.price.toFixed(2)}
              </td>
              <td className="w-1/12 py-4 px-1 align-top text-right">
                {product.qty}
              </td>
              <td className="w-1/12 py-4 px-1 align-top text-right">
                ${(product.price * product.qty).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-6 mt-4 mb-32 font-semibold">
        <button
          className="px-4 py-2 hover:underline hover:text-blue-400"
          onClick={clearCart}
        >
          Clear Shopping Cart
        </button>
        <button className="px-4 py-2 bg-white text-black border border-white hover:bg-transparent hover:text-white rounded-lg">
          Update Shopping Cart
        </button>
      </div>
    </div>
  );
};
