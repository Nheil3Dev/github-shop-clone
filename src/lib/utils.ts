import { ProductVariant } from "@/types/types";

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortSizes = (variants: ProductVariant[]) => {
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  return variants.sort((a, b) => {
    return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
  });
};

export const getColors = (variants: ProductVariant[]) => {
  // Usamos un Map para asegurar colores únicos y sus códigos
  const colorMap = new Map<string, string>();

  variants.forEach((variant) => {
    // Si el color no ha sido añadido aún, lo añadimos con su colorCode
    if (!colorMap.has(variant.color)) {
      colorMap.set(variant.color, variant.colorCode);
    }
  });

  // Convertimos el map a un array de objetos
  return Array.from(colorMap, ([name, colorCode]) => ({
    name,
    colorCode,
  }));
};

export const getSizes = (variants: ProductVariant[]) => {
  const uniqueSizes = new Set<string>();

  variants.forEach((variant) => {
    if (Number(variant.stock) > 0) {
      uniqueSizes.add(variant.size);
    }
  });

  return [...uniqueSizes]; // Convertimos el Set a un array
};
