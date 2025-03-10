import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { CartProduct } from "@/types/types";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const CartItem = ({ product }: { product: CartProduct }) => {
  const { deleteCartItem, modifyQty } = useCart();
  return (
    <div className="flex flex-row align-baseline gap-2 m-4 border-b border-b-gray-400 pb-4 text-gray-500">
      <div className="w-3/12">
        <Image
          src={product.image}
          alt="Product Image"
          width={100}
          height={100}
        />
      </div>
      <div className="w-9/12 font-semibold">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/${product.slug}`}
            className="underline font-semibold text-black dark:text-gray-200 hover:no-underline"
          >
            {product.name}
          </Link>
          <button
            onClick={async () => {
              await deleteCartItem(product);
            }}
          >
            <TrashIcon height={20} className="hover:text-blue-400" />
          </button>
        </div>
        <p className="text-sm">
          Size:{" "}
          <span className="dark:text-gray-300 font-normal">
            {product.size?.toUpperCase() === "NONE" ? "-" : product.size}
          </span>
        </p>
        <p className="text-sm">
          Color:{" "}
          <span className="dark:text-gray-300 font-normal">
            {product.color?.toUpperCase() === "NONE" ? "-" : product.color}
          </span>
        </p>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex gap-2">
            Qty:{" "}
            <div className="dark:text-gray-300 font-normal inline-flex">
              <button
                type="button"
                className="flex items-center justify-center px-2 py-1"
                onClick={async () => {
                  await modifyQty(product, -1);
                }}
              >
                <MinusIcon width={10} />
              </button>
              <span className="w-[25px] bg-transparent text-center">
                {product.qty}
              </span>
              <button
                type="button"
                className="flex items-center justify-center px-2 py-1"
                onClick={async () => {
                  await modifyQty(product, 1);
                }}
              >
                <PlusIcon width={10} />
              </button>
            </div>
          </div>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
