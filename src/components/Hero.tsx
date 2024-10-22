import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import Image from "next/image";
import { getHomeInfo } from "../lib/get-home-info";
import { LinkButton } from "./LinkButton";

export const Hero = async ({ locale }: { locale: string }) => {
  const { title, description, image, button } = await getHomeInfo(locale);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1
            className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl 
            xl:text-6xl dark:text-white"
          >
            {title}
          </h1>
          {/* Aqui se pisarian los estilos de tailwind con los que nos traen (los strong los solucionamos en la primera clase) */}
          <div
            className="[&>p>strong]:font-bold max-w-2xl mb-6 font-light text-gray-500 dark:text-gray-400 
            lg:mb-8 md:text-lg lg:text-xl"
          >
            <BlocksRenderer content={description} />
          </div>
          <LinkButton href={"/categories"}>{button}</LinkButton>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={image}
            alt="mockup"
            className="rounded-lg"
            width={520}
            height={345}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
// className="w-6 h-6 ml-2 -mr-1"
