import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export async function getHomeInfo() {
  try {
    const res = await query("home?populate=cover");
    const { title, description, cover } = res.data;
    const image = `${STRAPI_HOST}/${cover.url}`;

    return { title, description, image };
  } catch (error) {
    console.error("Error fetching home info:", error);
    throw new Error("Failed to fetch products.");
  }
}
