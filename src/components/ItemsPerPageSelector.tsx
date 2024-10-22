"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const ItemsPerPageSelector = ({
  total,
  defaultLimit,
}: {
  total: number;
  defaultLimit: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLimit = Number(searchParams.get("limit")) || defaultLimit;
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("ItemsPerPageComponent");

  const createPageURL = (limit: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit.toString());

    if (Number(limit) * Number(currentPage) > total) {
      params.set("page", "1");
    }
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
    <div className="ml-auto">
      {t("label_1")}
      <select
        name="itemsPerPage"
        className="bg-transparent border-b border-white mx-2 py-2 pr-1"
        onChange={handleLimitChange}
        defaultValue={currentLimit}
      >
        <option className="text-gray-900" value="4">
          4
        </option>
        <option className="text-gray-900" value="8">
          8
        </option>
        <option className="text-gray-900" value="12">
          12
        </option>
      </select>
      {t("label_2")}
    </div>
  );
};
