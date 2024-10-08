import Link from "next/link";

export const PaginationData = ({
  page,
  pageSize,
  pageCount,
  total,
}: {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}) => {
  const isFirstPage = page === 1;
  const isLastPage = page === pageCount;

  const prevPage = page - 1;
  const nextPage = page + 1;

  const prevPageUrl = isFirstPage ? "#" : `?page=${prevPage}`;
  const nextPageUrl = isLastPage ? "#" : `?page=${nextPage}`;

  return (
    <div className="flex flex-col items-center mt-12">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(page - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(pageSize + page - 1, total)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>{" "}
        Products
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <Link
          href={prevPageUrl}
          className={`${
            isFirstPage ? "pointer-events-none opacity-50" : ""
          } flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          Prev Page
        </Link>

        <Link
          href={nextPageUrl}
          className={`${
            isLastPage ? "pointer-events-none opacity-50" : ""
          } flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          Next Page
        </Link>
      </div>
    </div>
  );
};
