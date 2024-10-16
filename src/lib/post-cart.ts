"use server";

import { post } from "./strapi";

export const addToCartStrapi = async (
  productVariantId: string,
  quantity: number,
  cartId: string
) => {
  // Obtener el userId o cartId para usuarios anónimos
  //const userId = user?.id;
  //const cartId = userId ? null : localStorage.getItem("cartId");

  const data = {
    cart_id: cartId as string,
    product_variant: productVariantId,
    quantity: quantity,
  };

  const response = await post("carts", data);

  //console.log(response);

  return response;
};

//...(userId ? { user: userId } : { cartId })
/* TODO: Crear un cart id en la sesion */
