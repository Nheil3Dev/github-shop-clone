import { LanguageSelector } from "./LanguageSelector";
import { Welcome } from "./Welcome";

export const TopHeader = ({ style }: { style?: string }) => {
  return (
    <div
      className={`${style} h-9 flex items-center bg-black text-white dark:bg-gray-200 dark:text-gray-900 transition-all duration-300 delay-100`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <LanguageSelector />
        <Welcome />
      </div>
    </div>
  );
};
