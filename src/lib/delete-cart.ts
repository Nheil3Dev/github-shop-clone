"use server";

import { del } from "./strapi";

export const deleteCartStrapi = async (productVariantId: string) => {
  const res = await del("carts", productVariantId);

  // Siempre devuelve un 204 borre o no borre
  if (res.status === 204) {
    return true;
  }

  return false;
};
