"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRight } from "@/shared/assets";
import { cn } from "@/shared/lib";
import "./product-images.scss";

export interface ProductImagesProps {
  images: string[];
  className?: string;
}

const block = cn("productImages");

export function ProductImages({ images, className }: ProductImagesProps) {
  const [activeImage, setActiveImage] = useState(0);

  const [showControls, setShowControls] = useState(false);

  const [canScrollUp, setCanScrollUp] = useState(false);

  const [canScrollDown, setCanScrollDown] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const onChangeActiveImage = (index: number) => {
    setActiveImage(index);
  };

  const prefixId = useId();

  const updateScrollControls = () => {
    if (panelRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = panelRef.current;
      setShowControls(scrollHeight > clientHeight);
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight);
    }
  };

  const scrollPanel = (direction: "up" | "down") => {
    if (panelRef.current) {
      const clientHeight = panelRef.current.clientHeight ?? 100;
      const scrollAmount = direction === "up" ? -clientHeight : clientHeight;
      panelRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateScrollControls();
  }, [images]);

  const onScroll = () => {
    updateScrollControls();
  };

  return (
    <div className={block("", [className])}>
      <div className={block("gallery")}>
        <div className={block("controls")}>
          {showControls && (
            <>
              {canScrollUp && (
                <button
                  aria-label="Прокрутить вверх"
                  className={block("control", { top: true })}
                  onClick={() => scrollPanel("up")}
                >
                  <ChevronRight style={{ rotate: "-90deg" }} />
                </button>
              )}
              {canScrollDown && (
                <button
                  aria-label="Прокрутить вниз"
                  className={block("control", { bottom: true })}
                  onClick={() => scrollPanel("down")}
                >
                  <ChevronRight style={{ rotate: "90deg" }} />
                </button>
              )}
            </>
          )}
        </div>

        <div
          className={block("panel")}
          onScroll={onScroll}
          ref={panelRef}
          role="tablist"
        >
          {images.map((src, index) => (
            <button
              aria-controls={prefixId + index}
              aria-label={`Изображение продукта №${index + 1}`}
              className={block("preview", { active: index === activeImage })}
              key={index}
              onClick={() => onChangeActiveImage(index)}
              role="tab"
            >
              <Image
                alt={`Изображение продукта №${index + 1}`}
                className={block("previewImage")}
                height={120}
                src={src}
                width={120}
              />
            </button>
          ))}
        </div>
      </div>

      <div className={block("content")}>
        {images.map((_, index) => (
          <Image
            alt="Изображение продукта"
            className={block("image", { active: index === activeImage })}
            height={600}
            id={prefixId + index}
            key={index}
            priority
            src={images[activeImage]}
            width={540}
          />
        ))}
      </div>
    </div>
  );
}
