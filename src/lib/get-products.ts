import {
  CategoryProduct,
  CategoryType,
  Pagination,
  ProductApi,
  ProductData,
} from "@/types/types";
import { query } from "./strapi";

const { STRAPI_HOST } = process.env;

export const getProducts = async ({
  pageSize,
  page,
  sort,
  locale = "en",
  categoryId,
}: {
  pageSize: number;
  page: number;
  sort?: string;
  locale?: string;
  categoryId?: string;
}): Promise<{ products: CategoryProduct[]; pagination: Pagination }> => {
  let url = `products?locale=${locale}&populate[0]=images&populate[1]=product_category`;

  if (categoryId)
    url += `&filters[product_category][slug][$contains]=${categoryId}`;
  if (page) url += `&pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;
  if (sort) url += `&sort=${sort}:desc`;

  try {
    const res: ProductApi = await query(url);
    const { data, meta } = res;

    const availableProducts = data.filter((product) => product.isActive);

    const products: CategoryProduct[] = availableProducts.map(
      (product: ProductData) => {
        const {
          name,
          slug,
          description,
          images: rawImages,
          price,
          product_category,
        } = product;
        const images = rawImages.map((image) => `${STRAPI_HOST}${image.url}`);
        const { slug: categorySlug } = product_category as CategoryType;
        return {
          name,
          slug,
          description,
          images,
          price,
          categorySlug,
        };
      }
    );

    return { products, pagination: meta.pagination };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
