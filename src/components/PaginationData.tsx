import { useTranslations } from "next-intl";

export const PaginationData = ({
  page,
  pageSize,
  total,
}: {
  page: number | string;
  pageSize: number;
  total: number;
}) => {
  const t = useTranslations("PaginationDataComponent");
  if (total <= pageSize) {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {total}
          </span>{" "}
          {t("field0")}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        {t("field0")}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(Number(page) - 1) * pageSize + 1}
        </span>
        -
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(pageSize * Number(page), total)}
        </span>{" "}
        {t("field1")}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
    </div>
  );
};
