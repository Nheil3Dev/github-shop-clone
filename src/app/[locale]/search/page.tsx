import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductsGrid } from "@/components/ProductsGrid";
import { redirect } from "@/i18n/routing";
import { Metadata } from "next";

type Props = {
  params: { categoryId: string; locale: string };
  searchParams: { page?: string; sortBy?: string; query: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const page = searchParams?.page ?? 1;
  const query = searchParams?.query ?? "";

  const title = `${
    Number(page) > 1 ? `Page ${page} | ` : ""
  }Search results for: '${query}' `;

  return {
    title,
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = params;
  const { query } = searchParams;

  if (!query) redirect("/");

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: `Search results for: '${searchParams?.query ?? " "}' `,
      href: "/search",
      active: true,
    },
  ];

  return (
    <>
      <section className="bg-white pb-16 antialiased dark:bg-gray-900">
        <div className="container mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <ProductsGrid locale={locale} searchParams={searchParams} />
      </section>
    </>
  );
}
