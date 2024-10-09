"use client";

import { Link } from "@/i18n/routing";
import { Product } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export const ProductItem = ({
  product,
  url,
}: {
  product: Product;
  url: string;
}) => {
  const [ishover, setIsHover] = useState(false);

  return (
    <div
      key={product.slug}
      className="w-full max-w-sm border dark:border-gray-900 hover:border-black dark:hover:border-gray-400"
    >
      <Link href={`${url}/${product.slug}`}>
        <div
          className="m-4 overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {ishover && product.images.length > 1 ? (
            <Image
              src={product.images[1]}
              alt="product image"
              width={382}
              height={382}
            />
          ) : (
            <Image
              src={product.images[0]}
              alt="product image"
              width={382}
              height={382}
            />
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link href={`${url}/${product.slug}`}>
          <h5 className="min-h-16 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>

        <div className="flex flex-row items-center justify-between mt-6 flex-wrap">
          <p className="text-4xl font-semibold">${product.price}</p>
          <button className="bg-black text-white dark:bg-blue-600 px-5 py-2 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
