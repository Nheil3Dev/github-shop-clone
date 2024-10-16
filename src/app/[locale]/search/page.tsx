import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Metadata } from "next";

type Props = {
  params: { categoryId: string; locale: string };
  searchParams?: { page: string; sortBy: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const page = searchParams?.page ?? 1;

  const title = `${
    Number(page) > 1 ? `Page ${page} | ` : ""
  }Search results for: `;

  return {
    title,
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = params;
  const page = Number(searchParams?.page ?? 1);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Search results for: ",
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

        <ProductsGrid page={page} locale={locale} searchParams={searchParams} />
      </section>
    </>
  );
}
