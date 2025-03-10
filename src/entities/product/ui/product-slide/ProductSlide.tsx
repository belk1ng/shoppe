import Image, { type StaticImageData } from "next/image";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { getProductPrice } from "../../lib/getProductPrice";
import "./product-slide.scss";

export interface ProductSlideProps {
  title: string;
  price: number;
  imageSrc: string | StaticImageData;
  cta?: string;
}

const block = cn("productSlide");

export function ProductSlide({
  title,
  price,
  imageSrc,
  cta,
}: ProductSlideProps) {
  return (
    <div className={block()}>
      <h2 className={block("title")} lang="en">
        {title}
      </h2>
      <span className={block("price")}>{getProductPrice(price)}</span>
      <Button className={block("cta")} variant="outlined-white">
        {cta ?? "Смотреть"}
      </Button>

      <Image
        alt={`Изображение продукта ${title}`}
        className={block("image")}
        fill
        priority
        sizes="100%"
        src={imageSrc}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
