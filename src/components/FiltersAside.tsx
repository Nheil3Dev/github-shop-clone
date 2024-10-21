import { getCategories } from "@/lib/get-categories";
import { getColors } from "@/lib/get-colors";
import { getSizes } from "@/lib/get-sizes";
import { getTranslations } from "next-intl/server";
import { FilterCategories } from "./FilterCategories";
import { FilterColors } from "./FilterColors";
import { FilterSizes } from "./FilterSizes";
import { FiltersSelected } from "./FiltersSelected";

export const FiltersAside = async ({
  locale,
  productsLength,
  searchParams,
}: {
  locale: string;
  productsLength: number;
  searchParams?: {
    page?: string;
    sortBy?: string;
    query?: string;
    limit?: string;
    categoryId?: string;
    color?: string;
    size?: string;
  };
}) => {
  const t = await getTranslations("FilterComponent");
  const colors = await getColors(locale);
  const sizes = await getSizes();
  const categories = await getCategories(locale);
  return (
    <div className="w-72">
      <p className="py-2 mb-4">Shopping options</p>
      <FiltersSelected
        searchParams={searchParams}
        titleColor={t("color")}
        titleSize={t("size")}
        titleCategory={t("category")}
      />
      {productsLength > 0 && (
        <div className="flex flex-col gap-4">
          {!searchParams?.color && (
            <FilterColors colors={colors} title={t("color")} />
          )}
          {!searchParams?.size && (
            <FilterSizes sizes={sizes} title={t("size")} />
          )}
          {!searchParams?.categoryId && (
            <FilterCategories categories={categories} title={t("category")} />
          )}
        </div>
      )}
    </div>
  );
};
