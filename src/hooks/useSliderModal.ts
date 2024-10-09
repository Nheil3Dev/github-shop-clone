import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_ZOOM = 100;
const MAX_ZOOM = 121;
const MIN_ZOOM = 100;
const STEP_ZOOM = 7;

export const useSliderModal = () => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const handleIncreaseZoom = () => {
    if (zoom === MAX_ZOOM) return;
    else setZoom((prev) => prev + STEP_ZOOM);
  };
  const handleDecreaseZoom = () => {
    if (zoom === MIN_ZOOM) return;
    else setZoom((prev) => prev - STEP_ZOOM);
  };

  const handleWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      // Desplazamiento hacia abajo
      handleDecreaseZoom();
    } else {
      // Desplazamiento hacia arriba
      handleIncreaseZoom();
    }
  };

  const debouncedHandledWheel = useDebouncedCallback(handleWheel, 200);

  useEffect(() => {
    // Añadir el event listener
    window.addEventListener("wheel", debouncedHandledWheel);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("wheel", debouncedHandledWheel);
    };
  }, [debouncedHandledWheel]);
  return {
    zoom,
    handleIncreaseZoom,
    handleDecreaseZoom,
  };
};
