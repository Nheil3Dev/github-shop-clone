import { getCategories } from "@/lib/get-categories";
import { getCollections } from "@/lib/get-collections";
import { getColors } from "@/lib/get-colors";
import { getSizes } from "@/lib/get-sizes";
import { getTranslations } from "next-intl/server";
import { FilterCategories } from "./FilterCategories";
import { FilterCollections } from "./FilterCollections";
import { FilterColors } from "./FilterColors";
import { FilterSizes } from "./FilterSizes";
import { FiltersSelected } from "./FiltersSelected";

export const FiltersAside = async ({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams?: {
    page?: string;
    sortBy?: string;
    query?: string;
    limit?: string;
    categoryId?: string;
    collectionId?: string;
    color?: string;
    size?: string;
  };
}) => {
  const [t, colors, sizes, categories, collections] = await Promise.all([
    getTranslations("FilterComponent"),
    getColors(locale),
    getSizes(),
    getCategories(locale),
    getCollections(locale),
  ]);

  return (
    <div className="w-72">
      <p className="py-2 mb-4">{t("title")}</p>
      <FiltersSelected
        categories={categories}
        collections={collections}
        searchParams={searchParams}
        titleColor={t("color")}
        titleSize={t("size")}
        titleCategory={t("category")}
        titleCollection={t("collection")}
      />

      <div className="flex flex-col gap-4">
        {!searchParams?.color && (
          <FilterColors colors={colors} title={t("color")} />
        )}
        {!searchParams?.size && <FilterSizes sizes={sizes} title={t("size")} />}
        {!searchParams?.categoryId && (
          <FilterCategories categories={categories} title={t("category")} />
        )}
        {!searchParams?.collectionId && (
          <FilterCollections
            collections={collections}
            title={t("collection")}
          />
        )}
      </div>
    </div>
  );
};
