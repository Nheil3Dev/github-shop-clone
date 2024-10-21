"use server";

import { get } from "./strapi";

export const getCategories = async (locale: string = "en") => {
  const url = `product-categories?locale=${locale}&fields[0]=name&fields[1]=slug`;
  const response = await get(url);
  const { data } = response;

  return data;
};
