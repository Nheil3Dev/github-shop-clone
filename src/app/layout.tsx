import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { montserrat } from "./fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The NheiL Shop",
  description: "A Github's shop clon for learning with love :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-gray-50 dark:bg-gray-900  min-h-screen`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
