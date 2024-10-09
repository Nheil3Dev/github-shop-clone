import { Image } from "@/types/types";
import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getProduct = async (
  productId: string,
  locale: string = "en"
): Promise<{
  name: string;
  slug: string;
  description: any;
  images: string[];
  price: string | number;
  stock: string | number;
  color: string;
  productCategory: {
    name: string;
    slug: string;
  };
}> => {
  const url = `products?locale=${locale}&filters[slug][$contains]=${productId}&populate[0]=images&populate[1]=product_category`;

  try {
    const res = await query(url);
    const { data } = res;
    const {
      slug,
      name,
      description,
      price,
      stock,
      color,
      images: rawImages,
      product_category,
    } = data[0];
    const images = rawImages.map(
      (image: Image) => `${STRAPI_HOST}/${image.url}`
    );
    const productCategory = {
      name: product_category.name,
      slug: product_category.slug,
    };
    return {
      name,
      slug,
      description,
      images,
      price,
      stock,
      color,
      productCategory,
    };
  } catch (error) {
    console.error("Error fetching a product:", error);
    throw new Error("Failed to fetch a product");
  }
};
