"use server";

import { put } from "./strapi";

export const updateCartStrapi = async (
  documentId: string,
  quantity: number
) => {
  const url = `carts/${documentId}`;

  const data = {
    quantity,
  };

  const response = await put(url, data);

  console.log(response);
};
