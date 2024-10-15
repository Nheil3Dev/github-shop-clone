"use client";

import { Link } from "@/i18n/routing";
import { CategoryProduct } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export const ProductItem = ({
  product,
  url,
}: {
  product: CategoryProduct;
  url: string;
}) => {
  const [ishover, setIsHover] = useState(false);

  return (
    <div
      key={product.slug}
      className="w-full max-w-sm p-5 border dark:border-gray-900 hover:border-black dark:hover:border-gray-400 group"
    >
      <Link href={`${url}/${product.slug}`}>
        <div
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
      <div className="pt-5 relative">
        <div className="hidden absolute py-4 -top-[56px] w-full bg-black/90 items-center justify-center group-hover:flex text-gray-300">
          Vista rápida
        </div>

        <Link href={`${url}/${product.slug}`}>
          <h5 className="min-h-16 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
            {product.name}
          </h5>
        </Link>

        <p className="text-4xl font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
