"use server";

import { revalidatePath } from "next/cache";
import { put } from "./strapi";

export const updateCartStrapi = async (
  documentId: string,
  data: {
    product_variant?: string;
    quantity?: number;
  }
) => {
  const url = `carts/${documentId}`;

  await put(url, data);

  revalidatePath("/checkout/cart/");
};
