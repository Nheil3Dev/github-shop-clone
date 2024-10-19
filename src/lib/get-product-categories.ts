import { CategoryData } from "@/types/types";
import { get } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getCategories = async (locale: string = "en") => {
  try {
    const res = await get(
      `product-categories?locale=${locale}&fields[0]=name&fields[1]=slug&fields[2]=description&populate[image][fields][0]=url`
    );
    const categories = res.data.map((category: CategoryData) => {
      const { name, slug, description, image } = category;

      return {
        name,
        slug,
        description,
        image: `${STRAPI_HOST}/${image.url}`,
      };
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories.");
  }
};
