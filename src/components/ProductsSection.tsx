import { getProducts } from "@/lib/get-products";
import { CategoryProduct } from "@/types/types";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { FiltersAside } from "./FiltersAside";
import { ItemsPerPageSelector } from "./ItemsPerPageSelector";
import Pagination from "./Pagination2";
import { PaginationData } from "./PaginationData";
import { ProductItem } from "./ProductItem";
import { SortBySelector } from "./SortBySelector";

const PAGE_SIZE_DEFAULT = 8;

type Props = {
  searchParams?: {
    page?: string;
    sortBy?: string;
    query?: string;
    limit?: string;
    categoryId?: string;
    color?: string;
    size?: string;
  };
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
  const { products, pagination } = await getProducts({
    pageSize: searchParams?.limit ?? PAGE_SIZE_DEFAULT,
    page: searchParams?.page ?? 1,
    sort: searchParams?.sortBy,
    query: searchParams?.query,
    locale,
    categoryId: categoryId ?? searchParams?.categoryId,
    collectionId,
    color: searchParams?.color,
    size: searchParams?.size,
  });

  const t = await getTranslations("CategoryPage");
  const messages = await getMessages();

  return (
    <section id="products" className="flex gap-10">
      <FiltersAside
        locale={locale}
        searchParams={searchParams}
        productsLength={products.length}
      />
      <div className="flex flex-col flex-grow">
        {products.length > 0 && (
          <div className="container mx-auto flex flex-col-reverse justify-center items-center gap-2 sm:flex-row sm:justify-between sm:items-center">
            <NextIntlClientProvider
              messages={pick(messages, "PaginationDataComponent")}
            >
              <PaginationData
                page={searchParams?.page ?? 1}
                pageSize={pagination.pageSize}
                total={pagination.total}
              />
            </NextIntlClientProvider>
            <NextIntlClientProvider messages={pick(messages, "SortComponent")}>
              <SortBySelector />
            </NextIntlClientProvider>
          </div>
        )}

        {products.length === 0 && (
          <div>
            <h5 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-6">
              {t("noItems")}...
            </h5>
          </div>
        )}

        <div className="products container mx-auto flex flex-row flex-wrap items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {products.length > 0 &&
            products.map((product: CategoryProduct) => (
              <ProductItem product={product} key={product.slug} />
            ))}
        </div>

        {products.length > 0 && (
          <div className="container flex items-center justify-between mx-auto mt-16">
            <Pagination totalPages={pagination.pageCount} />
            <ItemsPerPageSelector
              total={pagination.total}
              defaultLimit={PAGE_SIZE_DEFAULT}
            />
          </div>
        )}
      </div>
    </section>
  );
};
