import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductsSection } from "@/components/ProductsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
};

type Props = {
  params: { locale: string };
  searchParams?: { page?: string; sortBy?: string; limit?: string };
};

export default function CollectionsPage({ params, searchParams }: Props) {
  const { locale } = params;

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Collections",
      href: "/collections",
      active: true,
    },
  ];
  return (
    <section className="bg-white pb-16 antialiased dark:bg-gray-900 md:container md:mx-auto">
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <ProductsSection locale={locale} searchParams={searchParams} />
    </section>
  );
}
