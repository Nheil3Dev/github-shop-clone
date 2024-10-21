"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const SortBySelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy") ?? "default";
  const t = useTranslations("SortComponent");

  const createPageURL = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    // Le di el valor default en vez de oldest_arivals por que asi se los trae de la api sin meterle sort
    if (sortBy !== "default") {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };

  // TODO: No funciona
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Guardar la posición de la sección de productos
    const section = document.getElementById("products");
    const sectionOffset = section?.offsetTop || 0;

    console.log("Offset", sectionOffset);

    // Cambiar el límite usando router.push
    router.push(createPageURL(e.target.value));

    // Restaurar el scroll a la sección de productos
    window.scrollTo({
      top: sectionOffset,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {t("label")}
      <select
        name="itemsPerPage"
        className="bg-transparent border-b border-white mx-2 py-2 pr-1"
        onChange={handleLimitChange}
        defaultValue={currentSort}
      >
        <option className="text-gray-900" value="default">
          {t("oldest_arrivals")}
        </option>
        <option className="text-gray-900" value="newest_arrivals">
          {t("newest_arrivals")}
        </option>
        <option className="text-gray-900" value="price_asc">
          {t("price_asc")}
        </option>
        <option className="text-gray-900" value="price_desc">
          {t("price_desc")}
        </option>
      </select>
    </div>
  );
};
