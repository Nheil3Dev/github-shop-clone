import { Hero } from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const btnText = t("button");
  return (
    <>
      <Hero btnText={btnText} />
    </>
  );
}
