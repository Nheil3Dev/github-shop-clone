"use client";

import { useSlider } from "@/hooks/useSlider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ImgModal } from "./ImgModal";

export const ImgSliderModal = ({ images }: { images: string[] }) => {
  const {
    activeImage,
    setActiveImage,
    isOpen,
    setIsOpen,
    handleNext,
    handlePrev,
  } = useSlider(images?.length);

  return (
    <>
      <div className="flex items-start flex-col w-full px-0 sm:px-20 md:px-0 md:w-3/5 overflow-hidden">
        {/* Slider */}
        <div className="h-auto relative overflow-hidden group">
          {/* Botón Anterior */}
          {activeImage > 0 && (
            <div
              className={`-left-20 top-0 absolute cursor-pointer flex items-center justify-center h-full bg-white/20 hover:bg-white/40 w-16 text-gray-500 text-5xl group-hover:left-0
              transition-all duration-300 ease-in-out delay-100 z-10`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="w-12" />
            </div>
          )}

          {/* Imágenes Carrusel */}
          <div
            className="flex items-center w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {images?.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Product Image ${index}`}
                height={603}
                width={603}
                className="w-full"
                onClick={() => setIsOpen(true)}
              />
            ))}
          </div>

          {/* Botón Siguiente */}
          {activeImage < images?.length - 1 && (
            <div
              className={`-right-20 absolute cursor-pointer top-0 flex items-center justify-center h-full bg-white/20 hover:bg-white/40 w-16 text-gray-500 text-5xl group-hover:right-0
           transition-all duration-300 ease-in-out delay-100`}
              onClick={handleNext}
            >
              <ChevronRightIcon className="w-12" />
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="flex flex-grow place-self-center md:hidden gap-3 py-4">
          {images?.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === activeImage ? "bg-black" : "bg-gray-300"
              }`}
              onClick={() => setActiveImage(index)}
            ></div>
          ))}
        </div>
      </div>
      <ImgModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </>
  );
};
