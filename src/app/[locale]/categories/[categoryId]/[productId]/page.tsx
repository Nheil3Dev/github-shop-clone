import Breadcrumbs from "@/components/Breadcrumbs";
import { ImgSlider } from "@/components/ImgSlider";
import { ProductInfo } from "@/components/ProductInfo";
import { getProduct } from "@/lib/get-product";
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
  const { name, description, images, price, productCategory, variants } =
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
          <ProductInfo
            name={name}
            description={description}
            price={price}
            variants={variants}
          />
        </div>
      </div>
    </section>
  );
}
