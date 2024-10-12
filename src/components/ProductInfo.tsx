"use client";

import { Description, ProductVariant } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { CartButton } from "./CartButton";
import { Sizes } from "./Sizes";

type Props = {
  name: string;
  description: Description;
  price: string | number;
  variants: ProductVariant[];
};

export const ProductInfo = ({ name, description, price, variants }: Props) => {
  const [selectedSize, setSelectedSize] = useState<
    ProductVariant | undefined
  >();
  const isStocked = variants.some((variant) => Number(variant.stock) > 0);
  const t = useTranslations("ProductPage");
  const format = useFormatter();

  return (
    <div className="md:w-2/5 mt-4 md:mt-16">
      <h2 className="text-xl md:text-5xl font-semibold mb-3">{name}</h2>
      <div className="flex flex-row justify-between items-end mb-8 pb-4 border-b dark:border-white">
        <h3 className="text-2xl md:text-4xl ">
          {format.number(Number(price), {
            style: "currency",
            currency: t("currency"),
          })}
        </h3>
        <div className="flex flex-col items-end">
          <p className="text-xl">{isStocked ? t("stocked") : t("noStocked")}</p>
          {selectedSize && (
            <p className="text-sm font-light">
              {t("remaining", { count: selectedSize.stock })}
            </p>
          )}
          {/* For products with no sizes like stickers */}
          {variants.length === 1 && (
            <p className="text-sm font-light">
              {t("remaining", { count: variants[0].stock })}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <form action="#">
          <Sizes
            title={t("size")}
            variants={variants}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <input
            type="number"
            className="text-black dark:text-white w-24 px-5 py-3 rounded-lg bg-transparent border dark:disabled:border-gray-600 dark:disabled:text-gray-600 disabled:border-gray-300 disabled:text-gray-300"
            min={1}
            step={1}
            defaultValue={1}
            disabled={!isStocked}
          />
          <CartButton isStocked={isStocked} />
        </form>
      </div>
      <div>
        <BlocksRenderer content={description} />
      </div>
    </div>
  );
};
