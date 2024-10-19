"use client";

import { SelectedProduct } from "@/types/types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export const QtySelector = ({
  selectedProduct,
  handleQty,
  isStocked,
}: {
  selectedProduct: SelectedProduct;
  handleQty: (prop: number) => void;
  isStocked: boolean;
}) => {
  return (
    <div className="inline-flex text-black dark:text-white rounded-lg bg-transparent border dark:disabled:border-gray-600 dark:disabled:text-gray-600 disabled:border-gray-300 disabled:text-gray-300">
      <button
        type="button"
        className="flex items-center justify-center px-4 py-3 "
        onClick={() => handleQty(selectedProduct.qty - 1)}
      >
        <MinusIcon width={20} />
      </button>
      <input
        type="number"
        className="w-[50px] bg-transparent text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring focus:rounded-lg focus:ring-blue-400"
        min={1}
        step={1}
        value={selectedProduct?.qty}
        onChange={(ev) => handleQty(Number(ev.target.value))}
        disabled={!isStocked}
      />
      <button
        type="button"
        className="flex items-center justify-center px-4 py-3"
        onClick={() => handleQty(selectedProduct.qty + 1)}
      >
        <PlusIcon width={20} />
      </button>
    </div>
  );
};
