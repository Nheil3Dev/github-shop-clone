"use client";

import { useProduct } from "@/hooks/useProduct";
import { Link } from "@/i18n/routing";
import { CategoryProduct, ProductVariant } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useFormatter, useTranslations } from "next-intl";
import { ProductForm } from "./ProductForm";

type Props = {
  product: CategoryProduct;
  variants: ProductVariant[];
  close: () => void;
};

export const ProductInfoModal = ({ product, variants, close }: Props) => {
  const { name, description, price } = product;
  const {
    selectedProduct,
    handleQty,
    handleSelectedColor,
    handleSelectedSize,
    isStocked,
    colors,
    sizes,
    error,
    setError,
  } = useProduct(variants);

  const t = useTranslations("ProductPage");
  const format = useFormatter();

  return (
    <div className="md:w-2/3">
      <h2 className="text-xl md:text-5xl font-semibold mb-3">{name}</h2>
      <div className="flex flex-row justify-between items-end mb-8 pb-4 border-b dark:border-white">
        <h3 className="text-2xl md:text-4xl ">
          {format.number(Number(price), {
            style: "currency",
            currency: t("currency"),
          })}
        </h3>

        {/* Stock */}
        <div className="flex flex-col items-end justify-end h-12">
          <p className="text-xl">{isStocked ? t("stocked") : t("noStocked")}</p>
          {selectedProduct?.stock && (
            <p className="text-sm font-light">
              {t("remaining", { count: selectedProduct?.stock })}
            </p>
          )}
        </div>
      </div>

      <ProductForm
        product={product}
        variants={variants}
        sizeTitle={t("size")}
        handleQty={handleQty}
        handleSelectedColor={handleSelectedColor}
        handleSelectedSize={handleSelectedSize}
        selectedProduct={selectedProduct}
        sizes={sizes}
        colors={colors}
        error={error}
        setError={setError}
        closeModal={close}
      />

      <Link
        className="mb-8 flex items-center justify-center text-white font-semibold rounded-lg py-3 border hover:underline"
        href={`/${product.slug}`}
      >
        {t("modalLink")}
      </Link>

      <div>
        <BlocksRenderer content={description} />
      </div>
    </div>
  );
};
