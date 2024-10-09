import { useTranslations } from "next-intl";

export const PaginationData = ({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) => {
  const t = useTranslations("PaginationDataComponent");
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        {t("field0")}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(page - 1) * pageSize + 1}
        </span>
        -
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(pageSize + page - 1, total)}
        </span>{" "}
        {t("field1")}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
    </div>
  );
};
