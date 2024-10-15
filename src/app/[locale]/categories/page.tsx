import Breadcrumbs from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop all",
};

type Props = {
  params: { locale: string };
  searchParams?: { page: string; sortBy: string };
};

export default function CategoryPage({ params, searchParams }: Props) {
  const { locale } = params;
  const page = Number(searchParams?.page ?? 1);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Shop all",
      href: "#",
      active: true,
    },
  ];

  return (
    <section className="bg-white pb-16 antialiased dark:bg-gray-900 md:container md:mx-auto">
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <Categories locale={locale} />

      <ProductsGrid page={page} locale={locale} searchParams={searchParams} />
    </section>
  );
}
