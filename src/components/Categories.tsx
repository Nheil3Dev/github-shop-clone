import { getCategories } from "@/lib/get-product-categories";
import { CategoryType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export const Categories = async () => {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <div className="max-w-screen-xl px-4 2xl:px-0 py-8">
      <div className="mb-4 mt-6 grid grid-cols-1 gap-4 text-center sm:mt-8 sm:grid-cols-2 lg:mb-0 lg:grid-cols-4 xl:gap-8">
        {categories.map((category: CategoryType, index: number) => (
          <Link
            href={`/categories/${category.slug}`}
            key={index}
            className="grid place-content-center overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Image
              src={category.image}
              alt={category.name}
              height={246}
              width={246}
              loading="lazy"
              className="mx-auto aspect-square w-full h-auto object-cover text-gray-400 dark:text-gray-500"
            />
            <p className="text-lg mt-6 font-semibold text-gray-900 dark:text-white">
              {category.name}
            </p>
            <small>{category.description}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};
