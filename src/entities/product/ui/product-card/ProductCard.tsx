import Image from "next/image";
import { cn } from "@/shared/lib";
import { PatchedLink } from "@/shared/ui";
import { getProductPrice } from "../../lib/getProductPrice";
import { Product } from "../../model/types";
import "./product-card.scss";

export interface ProductCardProps {
  product: Product;
  className?: string;
  heading?: Heading;
}

const block = cn("productCard");

export function ProductCard({ product, className, heading }: ProductCardProps) {
  const Heading = heading ?? "h3";

  return (
    <article className={block("", [className])}>
      <Heading className="visuallyHidden" lang="en">
        {product.name}
      </Heading>

      <Image
        alt="Product image"
        className={block("image")}
        height={380}
        src={product.images[0]}
        width={377}
      />

      <PatchedLink
        className={block("link")}
        href={`/catalog/${product.sku}`}
        lang="en"
      >
        {product.name}
      </PatchedLink>
      <p className={block("price")}>{getProductPrice(product.price)}</p>
    </article>
  );
}
