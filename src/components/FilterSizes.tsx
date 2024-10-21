"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { FilterItem } from "./FilterItem";

export const FilterSizes = ({
  sizes,
  title,
}: {
  sizes: {
    id: string;
    name: string;
  }[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", size.toLowerCase());
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };
  return (
    <FilterItem title={title}>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            type="button"
            className={`border text-sm text-gray-700 font-semibold bg-gray-300 border-gray-700 relative h-9 w-9 rounded-full hover:border-white`}
            onClick={() => createPageURL(size.name)}
          >
            {size.name}
          </button>
        ))}
      </div>
    </FilterItem>
  );
};
