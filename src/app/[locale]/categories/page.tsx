import Breadcrumbs from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoryPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Categories",
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
    </section>
  );
}
