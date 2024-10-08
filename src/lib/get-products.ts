import { Pagination, Product, ProductApi, ProductData } from "@/types/types";
import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getProducts = async ({
  categoryId,
  pageSize,
  page,
  sort,
}: {
  categoryId: "shirts" | "stickers";
  pageSize: number;
  page: number;
  sort?: string;
}): Promise<{ products: Product[]; pagination: Pagination }> => {
  let url = `products?filters[product_category][slug][$contains]=${categoryId}&populate=images`;

  if (page) url += `&pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;
  if (sort) url += `&sort=${sort}:desc`;

  try {
    const res: ProductApi = await query(url);
    const { data, meta } = res;

    const products: Product[] = data.map((product: ProductData) => {
      const { name, slug, description, images: rawImages, price } = product;
      const images = rawImages.map((image) => `${STRAPI_HOST}/${image.url}`);

      return {
        name,
        slug,
        description,
        images,
        price,
      };
    });

    return { products, pagination: meta.pagination };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
