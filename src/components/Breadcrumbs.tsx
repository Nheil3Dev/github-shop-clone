import { Link } from "@/i18n/routing";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="items-center justify-center sm:justify-start pb-8 pt-2 hidden md:flex container mx-auto"
    >
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${
              breadcrumb.active
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:underline"
            }`}
          >
            <Link
              className={breadcrumb.active ? "cursor-default" : ""}
              href={breadcrumb.href}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
