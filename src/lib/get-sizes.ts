"use server";

import { get } from "./strapi";

export const getSizes = async () => {
  const response = await get("sizes");
  const { data } = response;

  return data;
};
