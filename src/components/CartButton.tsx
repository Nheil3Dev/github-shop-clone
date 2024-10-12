import { useTranslations } from "next-intl";

export const CartButton = ({ isStocked }: { isStocked: boolean }) => {
  const t = useTranslations("CartBtnComponent");
  if (isStocked) {
    return (
      <button
        type="submit"
        className="inline-flex items-center justify-center px-5 py-3 ml-6 text-base font-medium 
                  text-center text-white rounded-lg border border-black bg-black dark:bg-white dark:text-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white focus:ring-4 focus:ring-black dark:focus:ring-white"
      >
        {t("label")}
      </button>
    );
  }

  return (
    <div
      className="inline-flex items-center justify-center px-5 py-3 ml-6 text-base font-medium
                    text-center text-white dark:text-gray-900 rounded-lg bg-gray-300  dark:bg-gray-600 cursor-default"
    >
      {t("label")}
    </div>
  );
};
