"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { CartProduct } from "@/types/types";
import { CheckoutTableRow } from "./CheckoutTableRow";

export const CheckoutTable = () => {
  const { cart, clearCart, deleteCartItem, modifyAllQty } = useCart();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    // Creamos un FormData para capturar todos los inputs (qty) del formulario
    const formData = new FormData(event.target);
    const products = [];

    // Iteramos sobre cada entrada del FormData
    for (const [key, value] of formData.entries()) {
      const documentId = key;

      // Buscamos el producto en el carrito
      const index = cart.findIndex(
        (item: CartProduct) => item.documentId === documentId
      );

      if (index !== -1) {
        const newQty = Number(value);
        const diff = newQty - cart[index].qty;

        products.push({
          documentId,
          qty: newQty,
          diff,
        });
      }
    }
    await modifyAllQty(products);
  };

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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
            {cart.map((product: CartProduct) => (
              <CheckoutTableRow
                key={product.documentId}
                product={product}
                deleteCartItem={deleteCartItem}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-6 mt-4 mb-32 font-semibold">
          <button
            type="button"
            className="px-4 py-2 hover:underline hover:text-blue-400"
            onClick={clearCart}
          >
            Clear Shopping Cart
          </button>
          <button className="px-4 py-2 bg-white text-black border border-white hover:bg-transparent hover:text-white rounded-lg">
            Update Shopping Cart
          </button>
        </div>
      </form>
    </div>
  );
};
