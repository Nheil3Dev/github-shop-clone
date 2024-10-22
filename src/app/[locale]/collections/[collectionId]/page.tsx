import Breadcrumbs from "@/components/Breadcrumbs";
import { ProductsSection } from "@/components/ProductsSection";
import { getCollection } from "@/lib/get-collection";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { collectionId: string; locale: string };
  searchParams: { page?: string; sortBy?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = params.collectionId;

  const title = productId
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");

  return {
    title,
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { locale, collectionId } = params;
  const collection = await getCollection(locale, collectionId);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
      active: false,
    },
    {
      label: "Collections",
      href: "/collections",
      active: false,
    },
    {
      label: collection.name,
      href: `/collections/${collectionId}`,
      active: true,
    },
  ];

  //console.log(collection);
  return (
    <section className="mb-40 bg-white pt-8 md:pt-0 pb-16 antialiased dark:bg-gray-900 container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container px-4 sm:px-0 mx-auto">
        <div className="flex w-full h-96">
          <Image
            src={collection.image}
            width={1600}
            height={400}
            alt="Collection image"
            className="object-cover object-top rounded-lg"
          />
        </div>
        <p className="text-xl font-semibold mt-4 mb-20">
          {collection.description}
        </p>

        <ProductsSection
          locale={locale}
          searchParams={searchParams}
          collectionId={collectionId}
        />
      </div>
    </section>
  );
}
