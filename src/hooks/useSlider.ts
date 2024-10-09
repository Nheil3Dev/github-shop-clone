import { useEffect, useState } from "react";

export const useSlider = (imgsCount: number) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    setActiveImage((prev) => (prev < imgsCount - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev > 0 ? prev - 1 : imgsCount - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return {
    activeImage,
    setActiveImage,
    isOpen,
    setIsOpen,
    handleNext,
    handlePrev,
  };
};
