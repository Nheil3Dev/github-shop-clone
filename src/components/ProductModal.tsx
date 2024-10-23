import { CategoryProduct, ProductVariant } from "@/types/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ImgSliderModal } from "./ImgSliderModal";
import { ProductInfoModal } from "./ProductInfoModal";

export const ProductModal = ({
  product,
  variants,
  close,
}: {
  product: CategoryProduct;
  variants: ProductVariant[];
  close: () => void;
}) => {
  return (
    <div className=" z-40 fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[950px] bg-gray-900 relative">
        <div className="flex flex-col md:flex-row p-10 gap-10">
          <ImgSliderModal images={product.images} />
          <ProductInfoModal
            product={product}
            variants={variants}
            close={close}
          />
        </div>
        <button className="absolute -top-10 right-0 " onClick={close}>
          <XMarkIcon width={30} />
        </button>
      </div>
    </div>
  );
};
