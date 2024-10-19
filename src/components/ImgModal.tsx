"use client";

import { useSliderModal } from "@/hooks/useSliderModal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const ImgModal = ({
  images,
  isOpen,
  setIsOpen,
  activeImage,
  setActiveImage,
  handlePrev,
  handleNext,
}: {
  images: string[];
  isOpen: boolean;
  setIsOpen: (prop: boolean) => void;
  activeImage: number;
  setActiveImage: (prop: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  const { zoom, handleIncreaseZoom, handleDecreaseZoom } = useSliderModal();

  if (!isOpen) return;

  return (
    <div className="top-0 left-0 fixed w-full h-full bg-white dark:bg-gray-900 z-40">
      <div className="flex flex-col-reverse w-full h-full overflow-hidden">
        {/* Miniaturas de fotos */}
        <div className="hidden md:flex flex-row relative min-w-20">
          {images.map((image, index) => (
            <div key={index} onClick={() => setActiveImage(index)}>
              <Image
                src={image}
                alt={`Product Image ${index}`}
                height={80}
                width={80}
              />
            </div>
          ))}
          {/* Indicador de la imagen seleccionada */}
          <div
            className={`h-20 w-20 border border-gray-300 bg-black/30 absolute transition-all duration-300 ease-in-out delay-100`}
            style={{ left: `${activeImage * 5}rem` }} // Ajusta la posición según la imagen seleccionada
          ></div>
        </div>

        {/* Mobile */}
        <div className="flex flex-grow place-self-center md:hidden gap-3 py-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                index === activeImage
                  ? "bg-orange-500 border-orange-500"
                  : "bg-tansparent border-gray-600"
              }`}
              onClick={() => setActiveImage(index)} // Cambia la imagen activa al hacer clic
            ></div>
          ))}
        </div>

        {/* Slider */}
        <div className="w-full h-full overflow-hidden relative flex justify-center items-center group">
          {/* Botones de zoom */}
          <button
            className="z-20 flex justify-center items-center text-gray-400 w-[72px] h-[72px] absolute top-1 left-1
           focus:border focus:border-blue-400"
            onClick={handleIncreaseZoom}
          >
            <PlusIcon className="w-10 h-auto" />
          </button>

          <button
            className="z-20 flex justify-center items-center text-gray-400 w-[72px] h-[72px] absolute top-20 left-1
          focus:border focus:border-blue-400"
            onClick={handleDecreaseZoom}
          >
            <MinusIcon className="w-10 h-auto" />
          </button>
          {/* Botón Anterior */}
          {activeImage > 0 && (
            <div
              className={`top-0 -left-20 absolute cursor-pointer flex items-center justify-center h-full bg-white/20 hover:bg-white/25 w-20 text-gray-500 text-5xl group-hover:left-0
             transition-left duration-300 ease-in-out delay-100 z-10`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="w-12" />
            </div>
          )}
          {/* Imágenes Carrusel */}
          <div
            className="w-full h-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex justify-center items-center"
              >
                <Image
                  src={image}
                  alt={`Product Image ${index}`}
                  height={1200}
                  width={1200}
                  className="object-contain transition-transform duration-300 ease-in"
                  onClick={() => setIsOpen(true)}
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              </div>
            ))}
          </div>
          {/* Botón Cerrar */}
          <button
            className="z-20 flex justify-center items-center text-gray-400 w-[72px] h-[72px] absolute top-1 right-1 focus:border focus:border-blue-400 focus-visible:outline-blue-400 focus-visible:border-blue-400"
            onClick={() => setIsOpen(false)}
            autoFocus
          >
            <XMarkIcon className="w-12 h-auto" />
          </button>

          {/* Botón Siguiente */}
          {activeImage < images.length - 1 && (
            <div
              className={`absolute cursor-pointer -right-20 top-0 flex items-center justify-center h-full bg-white/20 hover:bg-white/25 w-20 text-gray-500 text-5xl group-hover:right-0
            transition-right duration-300 ease-in-out delay-100`}
              onClick={handleNext}
            >
              <ChevronRightIcon className="w-12" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
