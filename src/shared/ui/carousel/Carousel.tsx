"use client";

import { Children, PropsWithChildren, useId } from "react";
import { cn } from "@/shared/lib";
import { useCarousel } from "./useCarousel";
import "./carousel.scss";

export interface CarouselProps {
  className?: string;
  autoPlayInterval?: number;
}

const block = cn("carousel");

export function Carousel({
  className,
  autoPlayInterval,
  children,
}: PropsWithChildren<CarouselProps>) {
  const slides = Children.count(children);

  const { activeSlide, onChangeSlide } = useCarousel(slides, autoPlayInterval);

  const prefixId = useId();

  return (
    <div className={block("", [className])}>
      <div aria-live="polite" className={block("slides")}>
        {Children.map(children, (child, index) => (
          <div
            aria-label={`${index + 1} из ${slides}`}
            aria-roledescription="slide"
            className={block("slide", { active: index === activeSlide })}
            id={prefixId + index}
            key={index}
            role="tabpanel"
          >
            {child}
          </div>
        ))}
      </div>

      <div aria-label="Слайды" className={block("indicators")} role="tablist">
        {Children.map(children, (_, index) => (
          <button
            aria-controls={prefixId + index}
            aria-label={`Слайд ${index + 1}`}
            aria-selected={index === activeSlide}
            className={block("indicator", { active: index === activeSlide })}
            key={index}
            onClick={() => onChangeSlide(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
