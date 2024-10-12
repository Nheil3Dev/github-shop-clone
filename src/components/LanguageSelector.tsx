"use client";

import { Link, usePathname } from "@/i18n/routing";

export const LanguageSelector = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-3">
      <Link href={`${pathname}`} locale={"es"} className="font-bold text-xs">
        ES
      </Link>
      <p>|</p>
      <Link href={`${pathname}`} locale={"en"} className="font-bold text-xs">
        EN
      </Link>
    </div>
  );
};
