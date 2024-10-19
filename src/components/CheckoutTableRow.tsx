import { Link } from "@/i18n/routing";
import { CartProduct } from "@/types/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const CheckoutTableRow = ({
  product,
  deleteCartItem,
}: {
  product: CartProduct;
  deleteCartItem: (prop: CartProduct) => void;
}) => {
  return (
    <tr className="border-b border-b-gray-400">
      <td className="py-4 w-3/12">
        <div className="w-1/2">
          <Image
            src={product.image}
            width={200}
            height={200}
            alt="Product image"
          />
        </div>
      </td>
      <td className="py-4 w-3/12 align-top">
        <div className="font-semibold">
          <Link
            href={`/${product.slug}`}
            className="underline font-semibold text-black dark:text-gray-200 hover:no-underline"
          >
            {product.name}
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Size:{" "}
            <span className="dark:text-gray-300 font-normal">
              {product.size.toUpperCase() === "NONE" ? "-" : product.size}
            </span>
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Color:{" "}
            <span className="dark:text-gray-300 font-normal">
              {product.color.toUpperCase() === "NONE" ? "-" : product.color}
            </span>
          </p>
        </div>
      </td>
      <td className="w-1/12 py-4 px-1 align-top text-right">
        ${product.price.toFixed(2)}
      </td>
      <td className="w-1/12 py-3 px-1 align-top text-right">
        <input
          type="number"
          className="py-1 w-[50px] bg-transparent text-sm text-black dark:text-gray-300 rounded-lg border text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring focus:rounded-lg focus:ring-blue-400"
          min={1}
          step={1}
          name={product.documentId}
          defaultValue={product.qty}
        />
      </td>
      <td className="w-1/12 py-4 px-1 align-top text-right relative">
        ${(product.price * product.qty).toFixed(2)}
        <div className="absolute bottom-4 right-0 flex gap-6">
          <button type="button">
            <Link href={`cart/edit/${product.documentId}`}>
              <PencilIcon width={17} />
            </Link>
          </button>
          <button type="button" onClick={() => deleteCartItem(product)}>
            <TrashIcon width={17} />
          </button>
        </div>
      </td>
    </tr>
  );
};
