import { Image, Product, ProductVariant } from "@/types/types";
import { query } from "./strapi";
import { sortSizes } from "./utils";

const { STRAPI_HOST } = process.env;

export const getProduct = async (
  productId: string,
  locale: string = "en"
): Promise<Product> => {
  const url = `products?locale=${locale}&filters[slug][$contains]=${productId}&populate[0]=images&populate[1]=product_category&populate[2]=product_variants`;

  try {
    const res = await query(url);
    const { data } = res;
    const {
      slug,
      name,
      description,
      price,
      images: rawImages,
      product_category,
      product_variants,
    } = data[0];

    const images = rawImages.map(
      (image: Image) => `${STRAPI_HOST}/${image.url}`
    );

    const productCategory = {
      name: product_category.name,
      slug: product_category.slug,
    };

    const variants = product_variants.map((variant: ProductVariant) => {
      return { color: variant.color, size: variant.size, stock: variant.stock };
    });

    const sortedVariants = sortSizes(variants);

    return {
      name,
      slug,
      description,
      images,
      price,
      productCategory,
      variants: sortedVariants,
    };
  } catch (error) {
    console.error("Error fetching a product:", error);
    throw new Error("Failed to fetch a product");
  }
};
