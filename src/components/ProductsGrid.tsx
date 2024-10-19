import { getProducts } from "@/lib/get-products";
import { CategoryProduct } from "@/types/types";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import PaginationAlt from "./Pagination2";
import { PaginationData } from "./PaginationData";
import { ProductItem } from "./ProductItem";
import { SortBy } from "./SortBy";

const PAGE_SIZE = 8;

type Props = {
  searchParams?: { page: string; sortBy: string; query: string };
  locale: string;
  categoryId?: string;
};

export const ProductsGrid = async ({
  searchParams,
  locale,
  categoryId,
}: Props) => {
  const { products, pagination } = await getProducts({
    pageSize: PAGE_SIZE,
    page: searchParams?.page ?? 1,
    sort: searchParams?.sortBy,
    query: searchParams?.query,
    locale,
    categoryId,
  });

  const t = await getTranslations("CategoryPage");
  const messages = await getMessages();

  return (
    <>
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
            <SortBy />
          </NextIntlClientProvider>
        </div>
      )}

      {products.length === 0 && (
        <div className="py-32 h-full w-full flex flex-grow-1 items-center justify-center">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("noItems")}
          </h5>
        </div>
      )}

      <div className="container mx-auto flex flex-row flex-wrap items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {products.length > 0 &&
          products.map((product: CategoryProduct) => (
            <ProductItem product={product} key={product.slug} />
          ))}
      </div>

      {products.length > 0 && (
        <div className="container flex items-center justify-center mx-auto mt-16">
          <PaginationAlt totalPages={pagination.pageCount} />
        </div>
      )}
    </>
  );
};
