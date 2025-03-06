import Image from "next/image";
import type { Product } from "@/entities/product";
import { cn } from "@/shared/lib";
import { PatchedLink } from "@/shared/ui";
import "./product-card.scss";

export interface ProductCardProps {
  product: Product;
  className?: string;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const block = cn("productCard");

export function ProductCard({ product, className, heading }: ProductCardProps) {
  const Heading = heading ?? "h3";

  return (
    <article className={block("", [className])}>
      <Heading className="visuallyHidden">{product.name}</Heading>

      <Image
        alt="Product image"
        className={block("image")}
        height={380}
        src={product.images[0]}
        width={377}
      />

      <PatchedLink className={block("link")} href={`/catalog/${product.sku}`}>
        {product.name}
      </PatchedLink>
      <p className={block("price")}>$ {product.price.toFixed(2)}</p>
    </article>
  );
}
