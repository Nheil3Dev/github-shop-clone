import Breadcrumbs from "@/components/Breadcrumbs";
import { ImgSlider } from "@/components/ImgSlider";
import { ProductInfo } from "@/components/ProductInfo";
import { getProduct } from "@/lib/get-product";
import { getVariants } from "@/lib/get-variants";
import { capitalize } from "@/lib/utils";
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
  /* Info from product */
  const product = await getProduct(productId, locale);
  const { images, name } = product;

  /* Variants from product like size, colors  */
  const variants = await getVariants(locale, productId);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: name,
      href: `/${productId}`,
      active: true,
    },
  ];
  return (
    <section className="mb-40 bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container px-4 sm:px-0 mx-auto">
        <div className="flex flex-col md:flex-row">
          <ImgSlider images={images} />
          <ProductInfo product={product} variants={variants} />
        </div>
      </div>
    </section>
  );
}
