"use client";

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
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href={`${url}/${product.slug}`}>
        <div
          className="m-8 overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {ishover && product.images.length > 1 ? (
            <Image
              className="rounded-t-lg"
              src={product.images[1]}
              alt="product image"
              width={382}
              height={382}
            />
          ) : (
            <Image
              className="rounded-t-lg"
              src={product.images[0]}
              alt="product image"
              width={382}
              height={382}
            />
          )}
        </div>
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="min-h-16 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </a>

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
