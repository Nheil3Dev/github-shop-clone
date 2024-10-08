import Breadcrumbs from "@/components/Breadcrumbs";
import PaginationAlt from "@/components/Pagination2";
import { PaginationData } from "@/components/PaginationData";
import { ProductItem } from "@/components/ProductItem";
import { SortBy } from "@/components/SortBy";
import { getProducts } from "@/lib/get-products";
import { capitalize } from "@/lib/utils";
import { Product } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const PAGE_SIZE = 3;

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: "shirts" | "stickers" };
  searchParams?: { page: string; sortBy: string };
}) {
  const { categoryId } = params;
  const page = Number(searchParams?.page ?? 1);

  const { products, pagination } = await getProducts({
    categoryId,
    page,
    pageSize: PAGE_SIZE,
    sort: searchParams?.sortBy,
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
            <PaginationData
              page={page}
              pageSize={pagination.pageSize}
              total={pagination.total}
            />
            <SortBy />
          </div>
        )}

        <div className="container mx-auto flex flex-row flex-wrap items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {products.length === 0 && (
            <div className="w-full max-w-sm flex">
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  No products found
                </h5>
              </div>
            </div>
          )}

          {products.length > 0 &&
            products.map((product: Product) => (
              <ProductItem
                product={product}
                url={`/categories/${categoryId}`}
                key={product.slug}
              />
            ))}
        </div>

        <div className="container flex items-center justify-center mx-auto mt-16">
          <PaginationAlt totalPages={pagination.pageCount} />
        </div>
      </section>
    </>
  );
}
