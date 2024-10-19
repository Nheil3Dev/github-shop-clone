"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";

export const CheckoutSummary = () => {
  const { cart, total } = useCart();

  if (cart.length === 0) return;
  return (
    <div className="w-1/5 bg-gray-200 p-3 text-gray-800">
      <h3 className="font-bold border-b border-b-gray-400 pb-3">Summary</h3>
      <div className="flex justify-between border-b border-b-gray-400 pb-3 pt-2 text-xs">
        <h4>Subtotal</h4>
        <p>${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-between pt-2 font-semibold">
        <h3>Order total</h3>
        <p>${total.toFixed(2)}</p>
      </div>
      <Link
        href={"/checkout"}
        className="mt-8 flex justify-center py-2 font-semibold bg-gray-900 text-white rounded-md border border-gray-900 hover:bg-transparent hover:text-gray-900"
      >
        Proceed to checkout
      </Link>
    </div>
  );
};
