"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { FilterItem } from "./FilterItem";

export const FilterCollections = ({
  collections,
  title,
}: {
  collections: {
    id: string;
    name: string;
    slug: string;
  }[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (collection: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("collectionId", collection.toLowerCase());
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };
  // Nos aseguramos de no poder seleccionar categorias si ya estamos viendo productos de una categoría
  if (pathname.split("/")[2] && pathname.split("/")[1] === "collections")
    return;

  return (
    <FilterItem title={title}>
      <div className="flex flex-col items-start gap-2">
        {collections?.map((collection) => (
          <button
            className="relative pl-4 hover:text-blue-400 before:content-[''] before:w-2 before:h-2 before:rounded-full before:border before:absolute before:left-0 before:inset-0 before:my-auto"
            key={collection.slug}
            onClick={() => createPageURL(collection.slug)}
          >
            {collection.name}
          </button>
        ))}
      </div>
    </FilterItem>
  );
};
