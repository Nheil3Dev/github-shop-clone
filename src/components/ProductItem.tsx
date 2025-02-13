"use client";

import { useProductModal } from "@/hooks/useProductModal";
import { Link } from "@/i18n/routing";
import { CategoryProduct } from "@/types/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Loader } from "./Loader";
import { ProductModal } from "./ProductModal";

export const ProductItem = ({ product }: { product: CategoryProduct }) => {
  const [isHover, setIsHover] = useState(false);
  const { variants, isModalOpen, toogleModal, isLoading } = useProductModal(
    product.slug
  );
  const t = useTranslations("ProductItemComponent");
  const format = useFormatter();

  return (
    <>
      <div
        key={product.slug}
        className="w-full max-w-sm p-5 border dark:border-gray-900 hover:border-black dark:hover:border-gray-400 group"
      >
        <Link href={`/${product.slug}`}>
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover && product.images.length > 1 ? (
              <Image
                src={product.images[1]}
                alt="product image"
                width={382}
                height={382}
                className={`transition-transform duration-200 ${
                  isHover ? "scale-105 " : "scale-100"
                }`}
              />
            ) : (
              <Image
                src={product.images[0]}
                alt="product image"
                width={382}
                height={382}
                className={`transition-transform duration-200 ${
                  isHover ? "scale-105 " : "scale-100"
                }`}
              />
            )}
          </div>
        </Link>
        <div className="pt-5 relative">
          <div
            className="hidden absolute py-4 -top-[56px] w-full bg-black/90 items-center justify-center group-hover:flex text-gray-300 font-semibold cursor-pointer"
            onClick={toogleModal}
          >
            <MagnifyingGlassIcon width={20} className="mr-1" />
            {t("quickview")}
          </div>

          <Link href={`/${product.slug}`}>
            <h5 className="min-h-16 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-400 hover:underline">
              {product.name}
            </h5>
          </Link>
          <div className="flex justify-between">
            <p className="text-4xl font-semibold">
              {format.number(Number(product.price), {
                style: "currency",
                currency: t("currency"),
                minimumFractionDigits: product.price % 1 === 0 ? 0 : 2, // No decimales si es un número entero
                maximumFractionDigits: 2, // Hasta 2 decimales si no es un entero
              })}
            </p>
            <div className="flex gap-2">
              {product.colors &&
                product.colors.length > 1 &&
                product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="h-9 w-9 rounded-full"
                    style={{ backgroundColor: color.colorCode }}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && variants && (
        <ProductModal
          product={product}
          variants={variants}
          close={toogleModal}
        />
      )}

      {isModalOpen && isLoading && !variants && (
        <div className=" z-20 fixed inset-0 bg-black/50 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};
