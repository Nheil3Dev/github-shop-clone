"use server";

import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getCart = async (cartId: string) => {
  const url = `carts?cart_id=${cartId}&populate[product_variant][populate][0]=product&populate[product_variant][populate][1]=product.images`;
  try {
    const response = await query(url);
    const { data } = response;
    const cart = data.map((item) => {
      const { documentId, quantity, product_variant } = item;
      const { id, color, size, product } = product_variant[0];
      const { name, price, slug, images } = product;
      return {
        variantId: id,
        documentId,
        qty: Number(quantity),
        color,
        size,
        name,
        price,
        slug,
        image: `${STRAPI_HOST}${images[0].url}`,
      };
    });

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error("Failed to fetch cart.");
  }
};
