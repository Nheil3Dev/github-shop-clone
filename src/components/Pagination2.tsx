"use client";

import { Link } from "@/i18n/routing";
import { generatePagination } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationAlt({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-2 -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className =
    "flex h-10 w-10 items-center justify-center text-sm border rounded-full" +
    (position === "first" || position === "single" ? " rounded-l-full" : "") +
    (position === "last" || position === "single" ? " rounded-r-full" : "") +
    (isActive
      ? " z-10 bg-black border-black dark:bg-blue-600 dark:border-blue-600 text-white"
      : "") +
    (!isActive && position !== "middle"
      ? " hover:bg-gray-100 dark:hover:text-gray-700"
      : "") +
    (position === "middle" ? " text-gray-300" : "");

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className =
    "flex h-10 w-10 items-center justify-center rounded-full border" +
    (isDisabled
      ? " pointer-events-none text-gray-300 dark:text-gray-700 dark:border-gray-700"
      : "") +
    (!isDisabled ? " hover:bg-gray-100 dark:hover:text-gray-700" : "") +
    (direction === "left" ? " mr-2 md:mr-4" : "") +
    (direction === "right" ? " ml-2 md:ml-4" : "");

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
