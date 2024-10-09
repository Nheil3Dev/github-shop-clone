"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SortBy = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("SortComponent");

  const currentFilter = searchParams.get("sortBy") ?? "all";

  const handleClick = (filter: string) => {
    const query = filter === "all" ? "" : `?sortBy=${filter}`;
    router.push(`${pathname}${query}`);
  };
  return (
    <div className="flex items-center justify-center py-4 md:py-0 flex-wrap gap-4">
      <button
        type="button"
        onClick={() => handleClick("all")}
        className={`inline-flex gap-2 border py-2 px-6 rounded-full ${
          currentFilter === "all"
            ? "bg-black border-black text-white dark:bg-blue-600 dark:border-blue-600"
            : "border-gray-500 hover:bg-white hover:text-gray-800"
        }`}
      >
        {t("default")}
      </button>
      <button
        type="button"
        onClick={() => handleClick("price")}
        className={`inline-flex gap-2 border py-2 px-6 rounded-full ${
          currentFilter !== "all"
            ? "bg-black border-black text-white dark:bg-blue-600 dark:border-blue-600"
            : "border-gray-500 hover:bg-white hover:text-gray-800"
        }`}
      >
        {t("price")}
      </button>
    </div>
  );
};
