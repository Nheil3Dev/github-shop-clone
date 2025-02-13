import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const ProductSkeleton = ({ itemsNumber }: { itemsNumber: number }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="h-[38px]"></div>
      <div className="products container mx-auto flex flex-row flex-wrap items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {Array(itemsNumber)
          .fill(null)
          .map((_, index) => (
            <Product key={index} />
          ))}
      </div>
    </div>
  );
};

const Product = () => {
  return (
    <div className="animate-pulse w-full max-w-sm p-5 border dark:border-gray-900 hover:border-black dark:hover:border-gray-400 group">
      <div className="max-w-[382px] max-h-[382px] aspect-square bg-white"></div>
      <div className="h-5 bg-gray-400 mt-5 rounded-xl"></div>
      <div className="h-5 w-32 bg-gray-400 mt-3 rounded-xl"></div>
      <div className="h-9 w-20 bg-white mt-5 rounded-2xl"></div>
    </div>
  );
};

export const FilterSkeleton = () => {
  return (
    <div className="w-72 animate-pulse">
      <div className="h-4 w-40 bg-white rounded-xl py-2 mb-8"></div>
      <div className="flex flex-col gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Filter key={index} />
          ))}
      </div>
    </div>
  );
};

const Filter = () => {
  return (
    <div>
      <div className="flex justify-between border-b pb-2 pr-2 cursor-pointer">
        <div className="h-4 w-20 bg-white rounded-xl"></div>
        <ChevronDownIcon width={20} />
      </div>
    </div>
  );
};
