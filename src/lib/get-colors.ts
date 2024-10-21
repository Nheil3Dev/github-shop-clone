"use server";

import { get } from "./strapi";

export const getColors = async (locale: string = "en") => {
  const url = `colors?locale=${locale}&fields[0]=name&fields[1]=code`;
  const response = await get(url);
  const { data } = response;

  return data;
};
