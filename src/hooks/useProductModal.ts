import { getVariants } from "@/lib/get-variants";
import { ProductVariant } from "@/types/types";
import { useEffect, useState } from "react";

export const useProductModal = (slug: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Aunque en el hook useProduct que esta dentro del componente tenga la opción de conseguir
  // las variantes, lo hago aquí para que bloquee el componente y cargue el loader
  const [variants, setVariants] = useState<ProductVariant[]>();
  const [isLoading, setIsLoading] = useState(false);

  const toogleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        setIsLoading(true);
        const res = await getVariants("es", slug);

        setVariants(res);
      } catch (error) {
        console.error("Error fetching variants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isModalOpen && slug) {
      fetchVariant();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, slug]);
  return {
    variants,
    isModalOpen,
    isLoading,
    setIsLoading,
    toogleModal,
  };
};
