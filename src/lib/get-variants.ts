import { get } from "./strapi";

export const getVariants = async (locale: string = "en", productId: string) => {
  const url = `product-variants?locale=${locale}&populate=product&filters[product][slug][$contains]=${productId}`;

  try {
    const res = await get(url);
    const { data } = res;
    const variants = data.map((variant) => {
      return {
        id: variant.id,
        size: variant.size,
        color: variant.color,
        colorCode: variant.color_code,
        stock: Number(variant.stock),
      };
    });
    return variants;
  } catch (error) {
    console.error("Error fetching variants:", error);
    throw new Error("Failed to fetch variants.");
  }
};
