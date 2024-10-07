import Breadcrumbs from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";

export default function Page() {
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
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16 container mx-auto">
      <div className="container mx-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <Categories />
    </section>
  );
}
