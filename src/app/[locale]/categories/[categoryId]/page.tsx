import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductsSection } from "@/components/ProductsSection";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { categoryId: string; locale: string };
  searchParams?: { page: string; sortBy: string };
};

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
      <section className="bg-white pb-16 antialiased dark:bg-gray-900 md:container md:mx-auto">
        <div className="container mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <ProductsSection
          locale={locale}
          searchParams={searchParams}
          categoryId={categoryId}
        />
      </section>
    </>
  );
}
