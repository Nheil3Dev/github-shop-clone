import { Link } from "@/i18n/routing";
import { LanguageSelector } from "./LanguageSelector";

export const Header = () => {
  return (
    <header className="flex justify-between dark:bg-gray-900 py-6 container md:mx-auto">
      <Link href="/">
        <p className="text-black dark:text-white font-extrabold ml-4">
          The NheiL's Shop
        </p>
      </Link>
      <LanguageSelector />
    </header>
  );
};
