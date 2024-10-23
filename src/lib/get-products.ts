"use server";

import {
  CategoryProduct,
  CategoryType,
  Pagination,
  ProductApi,
  ProductData,
  ProductVariant,
} from "@/types/types";
import { get } from "./strapi";
import { getColors } from "./utils";

const { STRAPI_HOST } = process.env;

export const getProducts = async ({
  pageSize,
  page,
  sort,
  query,
  locale = "en",
  categoryId,
  collectionId,
  color,
  size,
}: {
  pageSize: string | number;
  page: string | number;
  sort?: string;
  query?: string;
  locale?: string;
  categoryId?: string;
  collectionId?: string;
  color?: string;
  size?: string;
}): Promise<{ products: CategoryProduct[]; pagination: Pagination }> => {
  let url = `products?locale=${locale}&populate[0]=images&populate[1]=product_category&populate[2]=product_variants`;

  if (categoryId)
    url += `&filters[product_category][slug][$contains]=${categoryId}`;
  if (collectionId)
    url += `&filters[collections][slug][$contains]=${collectionId}`;
  if (color) url += `&filters[product_variants][color][$contains]=${color}`;
  if (size) url += `&filters[product_variants][size][$contains]=${size}`;
  if (size || color) url += `&filters[product_variants][stock][$gt]=0`;
  if (query) url += `&filters[name][$contains]=${query}`;
  if (page) url += `&pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;
  if (sort) {
    if (sort === "price_asc") url += `&sort=price:asc`;
    if (sort === "price_desc") url += `&sort=price:desc`;
    if (sort === "newest_arrivals") url += `&sort=createdAt:desc`;
  }

  try {
    // Añadimos el retraso artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res: ProductApi = await get(url);
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
          product_variants,
        } = product;
        const images = rawImages.map((image) => `${STRAPI_HOST}${image.url}`);

        if (!product_category) {
          throw new Error(
            `Forgot to add a product category to ${product.name}`
          );
        }
        const { slug: categorySlug } = product_category as CategoryType;
        return {
          name,
          slug,
          description,
          images,
          price,
          categorySlug,
          colors: getColors(product_variants as ProductVariant[]),
        };
      }
    );

    return { products, pagination: meta.pagination };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};
