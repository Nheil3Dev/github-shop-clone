"use client";

import { SelectedProduct } from "@/types/types";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const SizeSelector = ({
  sizes,
  title,
  selectedProduct,
  handleSelectedSize,
}: {
  sizes: string[];
  title: string;
  handleSelectedSize: (prop: string) => void;
  selectedProduct: SelectedProduct;
}) => {
  if (sizes[0] === "-" || sizes[0] === "NONE" || sizes[0] === null) return;

  return (
    <div>
      <p className="mb-4">
        {title} {selectedProduct?.size !== "-" ? selectedProduct?.size : ""}
      </p>
      <div className="flex gap-4 mb-10">
        {SIZES.map((size) => {
          if (sizes.includes(size)) {
            return (
              <button
                key={size}
                type="button"
                className={`h-14 w-14 rounded-full bg-gray-100 border text-gray-700 font-semibold text-sm 
                ${
                  selectedProduct?.size === size
                    ? "bg-transparent border-gray-900 dark:border-white dark:text-white"
                    : "border-transparent hover:border-white hover:bg-gray-900  hover:text-white"
                }`}
                onClick={() => handleSelectedSize(size)}
              >
                {size}
              </button>
            );
          } else {
            return (
              <div
                key={size}
                className="antialiased bg-gray-300 dark:bg-gray-600 border h-14 w-14 flex items-center justify-center text-white dark:text-gray-900 font-semibold text-sm border-transparent rounded-full cursor-default"
              >
                {size}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
