import { useCallback, useEffect, useState } from "react";

export const useCarousel = (slides: number, autoPlayInterval?: number) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const onNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev < slides - 1 ? prev + 1 : 0));
  }, [slides]);

  const onChangeSlide = useCallback(
    (slideIndex: number) => setActiveSlide(slideIndex),
    []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlayInterval) {
      interval = setInterval(onNextSlide, autoPlayInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [autoPlayInterval, onNextSlide, activeSlide]);

  return {
    activeSlide,
    onChangeSlide,
  } as const;
};
