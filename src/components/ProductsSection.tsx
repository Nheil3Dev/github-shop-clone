import { PAGE_SIZE_DEFAULT } from "@/lib/constants";
import { SearchParams } from "@/types/types";
import { Suspense } from "react";
import { FiltersAside } from "./FiltersAside";
import { FilterSkeleton, ProductSkeleton } from "./ProductSkeleton";
import { ProductsList } from "./ProductsList";

type Props = {
  searchParams?: SearchParams;
  locale: string;
  categoryId?: string;
  collectionId?: string;
};

export const ProductsSection = async ({
  searchParams,
  locale,
  categoryId,
  collectionId,
}: Props) => {
  return (
    <section id="products" className="flex gap-10">
      <Suspense fallback={<FilterSkeleton />}>
        <FiltersAside locale={locale} searchParams={searchParams} />
      </Suspense>
      <Suspense
        fallback={
          <ProductSkeleton
            itemsNumber={Number(searchParams?.limit ?? PAGE_SIZE_DEFAULT)}
          />
        }
      >
        <ProductsList
          searchParams={searchParams}
          locale={locale}
          categoryId={categoryId}
          collectionId={collectionId}
        />
      </Suspense>
    </section>
  );
};
