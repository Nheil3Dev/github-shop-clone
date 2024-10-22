import { get } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getCollection = async (
  locale: string = "en",
  collectionId: string
) => {
  const url = `collections?locale=${locale}&filters[slug][$contains]=${collectionId}&populate=image`;

  try {
    const res = await get(url);
    const { data } = res;

    const { name, description, image: rawImage } = data[0];

    return {
      name,
      description,
      image: `${STRAPI_HOST}${rawImage?.url}`,
    };
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw new Error("Failed to fetch collection.");
  }
};
