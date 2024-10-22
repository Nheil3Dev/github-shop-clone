"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { capitalize } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const FiltersSelected = ({
  categories,
  collections,
  searchParams,
  titleColor,
  titleSize,
  titleCategory,
  titleCollection,
}: {
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  collections: {
    id: number;
    name: string;
    slug: string;
  }[];
  searchParams?: {
    page?: string;
    sortBy?: string;
    query?: string;
    limit?: string;
    categoryId?: string;
    collectionId?: string;
    color?: string;
    size?: string;
  };
  titleColor: string;
  titleSize: string;
  titleCategory: string;
  titleCollection: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const createPageURL = (
    filter: "size" | "color" | "categoryId" | "collectionId" | "all"
  ) => {
    const params = new URLSearchParams(searchParams);

    if (filter === "all") {
      params.delete("size");
      params.delete("color");
      params.delete("categoryId");
      params.delete("collectionId");
    } else {
      params.delete(filter);
    }

    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      {searchParams?.color && (
        <div className="flex gap-1">
          <button onClick={() => createPageURL("color")}>
            <XMarkIcon width={20} />
          </button>
          <div>
            <span>{titleColor}: </span> {capitalize(searchParams.color)}
          </div>
        </div>
      )}
      {searchParams?.size && (
        <div className="flex gap-1">
          <button onClick={() => createPageURL("size")}>
            <XMarkIcon width={20} />
          </button>
          <div>
            <span>{titleSize}: </span>
            {searchParams.size.toUpperCase()}
          </div>
        </div>
      )}
      {searchParams?.categoryId && (
        <div className="flex gap-1">
          <button onClick={() => createPageURL("categoryId")}>
            <XMarkIcon width={20} />
          </button>
          <div>
            <span>{titleCategory}: </span>
            {
              categories.filter(
                (category) => category.slug === searchParams.categoryId
              )[0].name
            }
          </div>
        </div>
      )}
      {searchParams?.collectionId && (
        <div className="flex gap-1">
          <button onClick={() => createPageURL("collectionId")}>
            <XMarkIcon width={20} />
          </button>
          <div>
            <span>{titleCollection}: </span>
            {
              collections.filter(
                (collection) => collection.slug === searchParams.collectionId
              )[0].name
            }
          </div>
        </div>
      )}
      {(searchParams?.color ||
        searchParams?.size ||
        searchParams?.categoryId ||
        searchParams?.collectionId) && (
        <div className="mt-2 mb-8">
          <button
            className="text-sm underline hover:no-underline hover:text-blue-400"
            onClick={() => createPageURL("all")}
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
};
