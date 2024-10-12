import Breadcrumbs from "@/components/Breadcrumbs";
import PaginationAlt from "@/components/Pagination2";
import { PaginationData } from "@/components/PaginationData";
import { ProductItem } from "@/components/ProductItem";
import { SortBy } from "@/components/SortBy";
import { getProducts } from "@/lib/get-products";
import { capitalize } from "@/lib/utils";
import { CategoryProduct } from "@/types/types";
import pick from "lodash/pick";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

type Props = {
  params: { categoryId: "shirts" | "stickers"; locale: string };
  searchParams?: { page: string; sortBy: string };
};

const PAGE_SIZE = 3;

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const categoryId = params.categoryId;
  const page = searchParams?.page ?? 1;

  const title = `${Number(page) > 1 ? `Page ${page} | ` : ""}${capitalize(
    categoryId
  )}`;

  return {
    title,
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { categoryId, locale } = params;
  const page = Number(searchParams?.page ?? 1);
  const t = await getTranslations("CategoryPage");
  const messages = await getMessages();

  const { products, pagination } = await getProducts({
    categoryId,
    page,
    pageSize: PAGE_SIZE,
    sort: searchParams?.sortBy,
    locale,
  });

  const category = capitalize(categoryId);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Categories",
      href: "/categories",
      active: false,
    },
    {
      label: category,
      href: `/categories/${categoryId}`,
      active: true,
    },
  ];

  return (
    <>
      <section className="bg-white pb-16 antialiased dark:bg-gray-900">
        <div className="container mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        {products.length > 0 && (
          <div className="container mx-auto flex flex-col-reverse justify-center items-center gap-2 sm:flex-row sm:justify-between sm:items-center">
            <NextIntlClientProvider
              messages={pick(messages, "PaginationDataComponent")}
            >
              <PaginationData
                page={page}
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
              <ProductItem
                product={product}
                url={`/categories/${categoryId}`}
                key={product.slug}
              />
            ))}
        </div>

        {products.length > 0 && (
          <div className="container flex items-center justify-center mx-auto mt-16">
            <PaginationAlt totalPages={pagination.pageCount} />
          </div>
        )}
      </section>
    </>
  );
}
