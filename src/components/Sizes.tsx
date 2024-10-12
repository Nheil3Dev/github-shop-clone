import { ProductVariant } from "@/types/types";
import { Size } from "./Size";

type Props = {
  title: string;
  variants: ProductVariant[];
  selectedSize: ProductVariant | undefined;
  setSelectedSize: (prop: ProductVariant) => void;
};

export const Sizes = ({
  title,
  variants,
  selectedSize,
  setSelectedSize,
}: Props) => {
  // For products with no sizes like stickers
  if (variants.length === 1) return;

  return (
    <div>
      <p className="mb-4">
        {title} {selectedSize ? selectedSize.size : ""}
      </p>
      <div className="flex gap-4 mb-10">
        {variants.map((variant) => (
          <Size
            key={variant.size}
            size={variant.size}
            stock={variant.stock}
            onClick={() => setSelectedSize(variant)}
          />
        ))}
      </div>
    </div>
  );
};
