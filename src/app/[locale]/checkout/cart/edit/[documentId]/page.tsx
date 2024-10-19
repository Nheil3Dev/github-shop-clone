import { ImgSlider } from "@/components/ImgSlider";
import { ProductInfoEdit } from "@/components/ProductInfoEdit";
import { getProductFromCart } from "@/lib/get-product-cart";
import { getVariants } from "@/lib/get-variants";

export default async function EditPage({
  params,
}: {
  params: {
    locale: string;
    documentId: string;
  };
}) {
  const { locale, documentId } = params;
  const { product, variantToEdit } = await getProductFromCart(documentId);

  // console.log(product);
  /* Info from product */
  const { images, slug } = product;

  /* Variants from product like size, colors  */
  const variants = await getVariants(locale, slug);
  return (
    <section className="mb-40 bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto">
      <div className="container px-4 sm:px-0 mx-auto">
        <div className="flex flex-col md:flex-row">
          <ImgSlider images={images} />
          <ProductInfoEdit
            product={product}
            variants={variants}
            editProduct={variantToEdit}
          />
        </div>
      </div>
    </section>
  );
}
