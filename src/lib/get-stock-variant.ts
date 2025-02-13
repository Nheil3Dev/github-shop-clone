"use server";

import { get } from "./strapi";

export const getStockVariant = async (
  locale: string = "en",
  variantId: string
) => {
  // Añadimos el retraso artificial
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const url = `product-variants?locale=${locale}&filters[id][$eq]=${variantId}&fields[0]=stock`;
  const response = await get(url);
  const { data } = response;

  return data[0]?.stock;
};
