import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ["en", "es"],
  //   defaultLocale: "es",
  //   localeDetection: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
