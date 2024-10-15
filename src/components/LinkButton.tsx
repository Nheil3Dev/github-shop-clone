import { Link } from "@/i18n/routing";

export const LinkButton = ({
  children,
  href,
}: {
  children: React.ReactElement[];
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 mr-3 text-base 
      font-bold text-center text-white rounded-lg border border-black bg-black 
      dark:bg-white dark:text-gray-900 dark:border-white hover:bg-white 
      hover:text-black dark:hover:bg-transparent dark:hover:text-white focus:ring-2 
      focus:ring-black dark:focus:ring-white"
    >
      {children}
    </Link>
  );
};
