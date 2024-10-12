import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getHomeInfo } from "../lib/get-home-info";

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
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium 
            text-center text-white rounded-lg border border-black bg-black dark:bg-white dark:text-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white focus:ring-4 focus:ring-black dark:focus:ring-white"
          >
            {button}
            <svg
              className="w-6 h-6 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
            </svg>
          </Link>
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
