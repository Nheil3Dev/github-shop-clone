import {
  CategoryProduct,
  Pagination,
  ProductApi,
  ProductData,
} from "@/types/types";
import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getProducts = async ({
  categoryId,
  pageSize,
  page,
  sort,
  locale = "en",
}: {
  categoryId: string;
  pageSize: number;
  page: number;
  sort?: string;
  locale?: string;
}): Promise<{ products: CategoryProduct[]; pagination: Pagination }> => {
  let url = `products?locale=${locale}&filters[product_category][slug][$contains]=${categoryId}&populate=images`;

  if (page) url += `&pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;
  if (sort) url += `&sort=${sort}:desc`;

  try {
    const res: ProductApi = await query(url);
    const { data, meta } = res;

    const availableProducts = data.filter((product) => product.isActive);

    const products: CategoryProduct[] = availableProducts.map(
      (product: ProductData) => {
        const { name, slug, description, images: rawImages, price } = product;
        const images = rawImages.map((image) => `${STRAPI_HOST}/${image.url}`);

        return {
          name,
          slug,
          description,
          images,
          price,
        };
      }
    );

    return { products, pagination: meta.pagination };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
