import Breadcrumbs from "@/components/Breadcrumbs";
import { CartButton } from "@/components/CartButton";
import { ImgSlider } from "@/components/ImgSlider";
import { getProduct } from "@/lib/get-product";
import { capitalize } from "@/lib/utils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Metadata } from "next";

type Props = {
  params: { productId: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = params.productId;

  const title = productId
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");

  return {
    title,
  };
}

export default async function ProductPage({ params }: Props) {
  const { productId, locale } = params;
  const { name, description, images, price, stock, productCategory } =
    await getProduct(productId, locale);
  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Categories",
      href: "/categories",
      active: false,
    },
    {
      label: productCategory.name,
      href: `/categories/${productCategory.slug}`,
      active: false,
    },
    {
      label: name,
      href: `/categories/${productCategory.slug}/${productId}`,
      active: true,
    },
  ];
  return (
    <section className="bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container px-4 sm:px-0 mx-auto">
        <div className="flex flex-col md:flex-row">
          <ImgSlider images={images} />
          <div className="md:w-2/5 mt-4 md:mt-16">
            <h2 className="text-xl md:text-5xl font-semibold mb-3">{name}</h2>
            <div className="flex flex-row justify-between items-end mb-8 pb-4 border-b dark:border-white">
              <h3 className="text-2xl md:text-4xl ">
                ${Number(price).toFixed(2)}
              </h3>
              <p>{stock ? "In stock" : "Out of stock"}</p>
            </div>
            <div className="mb-8">
              <form action="#">
                <input
                  type="number"
                  className="text-black dark:text-white w-24 px-5 py-3 rounded-lg bg-transparent border"
                  min={1}
                  step={1}
                  defaultValue={1}
                />
                <CartButton />
              </form>
            </div>
            <div>
              <BlocksRenderer content={description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
