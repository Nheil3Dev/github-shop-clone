"use client";

import { useCart } from "@/context/CartContext";
import { ProductVariant, SelectedProduct } from "@/types/types";
import { FormEvent } from "react";
import { CartButton } from "./CartButton";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";

export const ProductForm = ({
  variants,
  image,
  price,
  name,
  sizeTitle,
  selectedProduct,
  handleSelectedColor,
  handleQty,
  handleSelectedSize,
  sizes,
  colors,
  error,
  setError,
}: {
  variants: ProductVariant[];
  image: string;
  price: number;
  name: string;
  sizeTitle: string;
  selectedProduct: SelectedProduct;
  handleSelectedColor: (color: string) => void;
  handleQty: (qty: number) => void;
  handleSelectedSize: (size: string) => void;
  sizes: string[];
  colors: {
    name: string;
    colorCode: string;
  }[];
  error: string;
  setError: (prop: string) => void;
}) => {
  const isStocked = variants.some((variant) => Number(variant.stock) > 0);

  /* Cart State */

  const { cart, addCartItem } = useCart();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const productToCart = {
      variantId: selectedProduct?.id as string,
      name,
      image,
      slug: "#",
      size: selectedProduct?.size as string,
      color: selectedProduct?.color as string,
      price: Number(price),
      qty: selectedProduct.qty,
    };

    if (productToCart.color === undefined) {
      setError("Debe seleccionar un color");
      return;
    }

    if (productToCart.size === undefined) {
      setError("Debe seleccionar una talla");
      return;
    }

    if (productToCart.variantId === undefined) {
      setError("Esta combinación no se encuentra disponible en este momento");
      return;
    }

    if (selectedProduct.stock && productToCart.qty > selectedProduct.stock) {
      setError("No disponemos de tanto stock en este momento");
      return;
    }

    if (
      cart.length > 0 &&
      selectedProduct.stock &&
      cart.filter((item) => item.variantId === selectedProduct?.id)[0]?.qty +
        selectedProduct.qty >
        selectedProduct.stock
    ) {
      setError("No disponemos de tanto stock en este momento");
      return;
    }

    setError("");

    await addCartItem(productToCart);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <ColorSelector
          colors={colors}
          handleSelectedColor={handleSelectedColor}
          selectedProduct={selectedProduct}
        />

        <SizeSelector
          sizes={sizes}
          title={sizeTitle}
          handleSelectedSize={handleSelectedSize}
          selectedProduct={selectedProduct}
        />

        <input
          type="number"
          className="text-black dark:text-white w-24 px-5 py-3 rounded-lg bg-transparent border dark:disabled:border-gray-600 dark:disabled:text-gray-600 disabled:border-gray-300 disabled:text-gray-300"
          min={1}
          step={1}
          value={selectedProduct?.qty}
          onChange={(ev) => handleQty(Number(ev.target.value))}
          disabled={!isStocked}
        />

        <CartButton isStocked={isStocked} />
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
