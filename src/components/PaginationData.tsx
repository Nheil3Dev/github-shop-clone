export const PaginationData = ({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Products{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(page - 1) * pageSize + 1}
        </span>
        -
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(pageSize + page - 1, total)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
    </div>
  );
};
