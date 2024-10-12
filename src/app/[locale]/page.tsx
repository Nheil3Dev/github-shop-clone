import { Hero } from "@/components/Hero";

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <>
      <Hero locale={locale} />
    </>
  );
}
