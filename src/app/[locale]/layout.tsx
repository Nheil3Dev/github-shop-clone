import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { montserrat } from "../fonts/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | The NheiL Shop",
    default: "Home | The NheiL Shop",
  },
  description: "A Github's shop clon for learning with love :)",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${montserrat.className} antialiased bg-white dark:bg-gray-900  min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
