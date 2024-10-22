"use server";

import { get } from "./strapi";

export const getCollections = async (locale: string = "en") => {
  const url = `collections?locale=${locale}&fields[0]=name&fields[1]=slug`;
  const response = await get(url);
  const { data } = response;

  return data;
};
