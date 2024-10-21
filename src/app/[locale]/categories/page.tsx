import Breadcrumbs from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { ProductsSection } from "@/components/ProductsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop all",
};

type Props = {
  params: { locale: string };
  searchParams?: { page?: string; sortBy?: string; limit?: string };
};

export default function CategoryPage({ params, searchParams }: Props) {
  const { locale } = params;

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Shop all",
      href: "/categories",
      active: true,
    },
  ];

  return (
    <section className="bg-white pb-16 antialiased dark:bg-gray-900 md:container md:mx-auto">
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <Categories locale={locale} />

      <ProductsSection locale={locale} searchParams={searchParams} />
    </section>
  );
}
