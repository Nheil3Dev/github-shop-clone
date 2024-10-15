import { Link } from "@/i18n/routing";
import { getCategories } from "@/lib/get-product-categories";
import { CategoryType } from "@/types/types";
import Image from "next/image";

export const Categories = async ({ locale }: { locale: string }) => {
  const categories = await getCategories(locale);

  if (categories.length === 0) return null;

  return (
    <div className="px-4 mb-20 mt-6 gap-5 sm:mt-2 grid grid-cols-1 md:px-0 md:grid-cols-3">
      {categories.map((category: CategoryType, index: number) => (
        <div key={index} className="flex flex-col">
          <Link href={`/categories/${category.slug}`}>
            <Image
              src={category.image}
              alt={category.name}
              height={246}
              width={492}
              loading="lazy"
              className="w-full h-[300px] object-cover object-top rounded-md"
            />
          </Link>
          <Link href={`/categories/${category.slug}`}>
            <p className="text-lg p-4 font-semibold text-gray-900 dark:text-white">
              {category.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};
