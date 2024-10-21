"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { FilterItem } from "./FilterItem";

export const FilterCategories = ({
  categories,
  title,
}: {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("categoryId", category.toLowerCase());
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };
  // Nos aseguramos de no poder seleccionar categorias si ya estamos viendo productos de una categoría
  if (pathname.split("/")[2] && pathname.split("/")[1] === "categories") return;

  return (
    <FilterItem title={title}>
      <div className="flex flex-col items-start gap-2">
        {categories?.map((category) => (
          <button
            className="relative pl-4 hover:text-blue-400 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border before:absolute before:left-0 before:inset-0 before:my-auto"
            key={category.slug}
            onClick={() => createPageURL(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </FilterItem>
  );
};
