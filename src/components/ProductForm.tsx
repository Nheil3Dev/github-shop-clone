"use client";

import { useCart } from "@/context/CartContext";
import { Product, ProductVariant, SelectedProduct } from "@/types/types";
import { FormEvent } from "react";
import { CartButton } from "./CartButton";
import { ColorSelector } from "./ColorSelector";
import { QtySelector } from "./QtySelector";
import { SizeSelector } from "./SizeSelector";

export const ProductForm = ({
  variants,
  product,
  sizeTitle,
  selectedProduct,
  handleSelectedColor,
  handleQty,
  handleSelectedSize,
  sizes,
  colors,
  error,
  setError,
  closeModal,
}: {
  variants: ProductVariant[];
  product: Product;
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
  closeModal?: () => void;
}) => {
  const { name, price, slug, images } = product;
  const isStocked = variants.some((variant) => Number(variant.stock) > 0);

  /* Cart State */

  const { cart, addCartItem } = useCart();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const productToCart = {
      variantId: selectedProduct?.id as string,
      name,
      image: images[0],
      slug: slug,
      size: selectedProduct?.size as string,
      color: selectedProduct?.color as string,
      price: Number(price),
      qty: selectedProduct.qty,
    };

    // VALIDATIONS

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

    // END VALIDATIONS

    setError("");

    await addCartItem(productToCart);

    if (closeModal) {
      closeModal();
    }
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

        <div className="flex flex-wrap gap-8 my-8">
          <QtySelector
            selectedProduct={selectedProduct}
            handleQty={handleQty}
            isStocked={isStocked}
          />

          <CartButton isStocked={isStocked} />
        </div>
      </form>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};
