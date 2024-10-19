import { getColors, getSizes } from "@/lib/utils";
import { ProductVariant, SelectedProduct } from "@/types/types";
import { useEffect, useState } from "react";

export const useProduct = (
  variants: ProductVariant[],
  editProduct?: SelectedProduct
) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    id: undefined,
    size: undefined,
    color: undefined,
    stock: undefined,
    qty: 1,
  });
  const [error, setError] = useState("");
  const colors = getColors(variants);
  const sizes = getSizes(variants);

  const isStocked = variants.some((variant) => Number(variant.stock) > 0);

  const handleSelectedColor = (color: string) => {
    setError("");
    // Si el color seleccionado es el mismo, lo deselecciona (opción "deseleccionar todos")
    if (selectedProduct.color === color) {
      setSelectedProduct((prev) => ({
        ...prev,
        color: undefined,
        id: undefined,
        stock: undefined,
      })); // Deselecciona todos los colores
    } else {
      // Si hay una talla seleccionada comprobamos que haya una variante con la talla y color seleccionados y le aplicamos el stock y el id
      if (selectedProduct.size) {
        const match = variants.find(
          (variant) =>
            variant.size === selectedProduct.size && variant.color === color
        );
        if (match) {
          const { stock, id } = match;
          const newSelectedProduct = {
            ...selectedProduct,
            id,
            color,
            stock,
          };
          setSelectedProduct(newSelectedProduct);
        } else {
          setSelectedProduct((prev) => ({
            ...prev,
            color,
            id: undefined,
            stock: undefined,
          })); // Selecciona el nuevo color
        }
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          color,
          id: undefined,
          stock: undefined,
        })); // Selecciona el nuevo color si no hay talla seleccionada
      }
    }
  };

  const handleSelectedSize = (size: string) => {
    setError("");
    // Si el color seleccionado es el mismo, lo deselecciona (opción "deseleccionar todos")
    if (selectedProduct.size === size) {
      setSelectedProduct((prev) => ({
        ...prev,
        size: undefined,
        id: undefined,
        stock: undefined,
      })); // Deselecciona todos los colores
    } else {
      if (selectedProduct.color) {
        const match = variants.find(
          (variant) =>
            variant.size === size && variant.color === selectedProduct.color
        );
        if (match) {
          const { stock, id } = match;
          const newSelectedProduct = {
            ...selectedProduct,
            id,
            size,
            stock,
          };
          setSelectedProduct(newSelectedProduct);
        } else {
          setSelectedProduct((prev) => ({
            ...prev,
            size,
            id: undefined,
            stock: undefined,
          })); // Selecciona el nuevo color
        }
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          size,
          id: undefined,
          stock: undefined,
        })); // Selecciona el nuevo color si no hay talla seleccionada
      }
    }
  };

  const handleQty = (qty: number) => {
    if (qty < 1) return;
    setError("");
    setSelectedProduct((prev) => ({ ...prev, qty: qty }));
  };

  useEffect(() => {
    // Si estamos editando un producto del carrito
    if (editProduct) {
      setSelectedProduct(editProduct);
      // Para productos que no tienen variantes
    } else if (sizes.length === 1 && colors.length === 1) {
      const [{ id, size, color, stock }] = variants;
      const uniqueSelectedProduct = {
        id,
        size,
        color,
        stock,
        qty: 1,
      };
      setSelectedProduct(uniqueSelectedProduct);
      // Con variantes
    } else {
      // Solo dispone de un color o color none
      if (colors.length === 1) {
        handleSelectedColor(colors[0].name);
      }
      // Solo dispone de una talla o talla none
      if (sizes.length === 1) {
        handleSelectedSize(sizes[0]);
      }
    }
  }, []);

  return {
    selectedProduct,
    handleQty,
    handleSelectedColor,
    handleSelectedSize,
    isStocked,
    sizes,
    colors,
    error,
    setError,
  };
};
