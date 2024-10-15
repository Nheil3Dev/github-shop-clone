"use client";

import { ProductColors } from "@/types/types";

export const ColorSelector = ({
  colors,
  handleSelectedColor,
  selectedProduct,
}: {
  colors: ProductColors[];
  handleSelectedColor: (prop: string) => void;
  selectedProduct: {
    size: string;
    color: string;
    stock: number | undefined;
    qty: number;
  };
}) => {
  if (
    colors[0]?.name === "-" ||
    colors[0]?.name === "NONE" ||
    colors.length < 2
  )
    return;

  return (
    <div>
      <p>
        Color {selectedProduct?.color !== "-" ? selectedProduct?.color : ""}
      </p>
      <div className="flex gap-4 my-4">
        {colors.map((color) => (
          <button
            key={color.colorCode}
            type="button"
            className={`h-14 w-14 rounded-full 
            ${
              selectedProduct?.color === color.name ? "ring-2 ring-white" : ""
            }`}
            onClick={() => handleSelectedColor(color.name)}
            style={{ backgroundColor: color.colorCode }}
          >
            {/* Contenido adicional, como un ícono de selección, si se quiere */}
          </button>
        ))}
      </div>
    </div>
  );
};
