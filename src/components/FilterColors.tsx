"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { FilterItem } from "./FilterItem";

export const FilterColors = ({
  colors,
  title,
}: {
  colors: {
    id: number;
    name: string;
    code: string;
  }[];
  title: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (color: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("color", color.toLowerCase());
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };
  return (
    <FilterItem title={title}>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            className={`relative h-9 w-9 rounded-full hover:after:absolute hover:after:content-[''] hover:after:inset-0 hover:after:m-auto hover:after:h-8 hover:after:w-8 hover:after:rounded-full hover:after:border-2 ${
              color.code.toUpperCase() === "#FFFFFF"
                ? "hover:after:border-black"
                : "hover:after:border-white"
            }`}
            onClick={() => createPageURL(color.name)}
            style={{ backgroundColor: color.code }}
          ></button>
        ))}
      </div>
    </FilterItem>
  );
};
