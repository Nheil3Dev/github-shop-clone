import { useTranslations } from "next-intl";

export const CartButton = () => {
  const t = useTranslations("CartBtnComponent");
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center px-5 py-3 ml-6 text-base font-medium 
                text-center text-white rounded-lg border border-black bg-black dark:bg-white dark:text-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white focus:ring-4 focus:ring-black dark:focus:ring-white"
    >
      {t("label")}
    </button>
  );
};
