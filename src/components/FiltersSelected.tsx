"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { capitalize } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const FiltersSelected = ({
  searchParams,
  titleColor,
  titleSize,
  titleCategory,
}: {
  searchParams?: {
    page?: string;
    sortBy?: string;
    query?: string;
    limit?: string;
    categoryId?: string;
    color?: string;
    size?: string;
  };
  titleColor: string;
  titleSize: string;
  titleCategory: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const createPageURL = (filter: "size" | "color" | "categoryId" | "all") => {
    const params = new URLSearchParams(searchParams);

    if (filter === "all") {
      params.delete("size");
      params.delete("color");
      params.delete("categoryId");
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
            {capitalize(searchParams.categoryId)}
          </div>
        </div>
      )}
      {(searchParams?.color ||
        searchParams?.size ||
        searchParams?.categoryId) && (
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
