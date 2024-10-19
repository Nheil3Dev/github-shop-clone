import { Image } from "@/types/types";
import { getWithoutCache } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getProductFromCart = async (documentId: string) => {
  const url = `carts/${documentId}?populate[product_variant][populate][0]=product&populate[product_variant][populate][1]=product.images`;

  try {
    const res = await getWithoutCache(url);

    const { data } = await res;

    if (!data || data.length === 0) {
      throw new Error(`No items found.`);
    }

    const { quantity, documentId, product_variant } = data;

    const {
      product: rawProduct,
      size,
      color,
      stock,
      id: variantId,
    } = product_variant[0];

    const {
      slug,
      name,
      price,
      description,
      images: rawImages,
      id: productId,
    } = rawProduct;

    const images = rawImages.map(
      (image: Image) => `${STRAPI_HOST}${image.url}`
    );

    return {
      variantToEdit: {
        id: variantId,
        documentId,
        size,
        color,
        stock,
        qty: quantity,
      },
      product: {
        id: productId,
        variantId: variantId,
        name,
        slug,
        description,
        images,
        price: Number(price),
      },
    };
  } catch (error) {
    console.error("Error fetching a product:", error);
    throw new Error(`Failed to fetch a product: ${error}`);
  }
};
