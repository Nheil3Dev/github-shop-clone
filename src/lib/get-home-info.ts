import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export async function getHomeInfo(locale: string = "en") {
  try {
    const res = await query(`home?locale=${locale}&populate=cover`);
    const { title, description, cover } = res.data;
    const image = `${STRAPI_HOST}/${cover.url}`;

    return { title, description, image };
  } catch (error) {
    console.error("Error fetching home info:", error);
    throw new Error("Failed to fetch products.");
  }
}
