import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Product } from "@/typings/products";
import "./product-card.scss";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

const block = cn("productCard");

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={block("", [className])}>
      <h3 className="visuallyHidden">{product.name}</h3>

      <Image
        alt="Product image"
        className={block("image")}
        height={380}
        src={product.images[0]}
        width={377}
      />

      <Link className={block("link")} href={`/catalog/${product.sku}`}>
        {product.name}
      </Link>
      <p className={block("price")}>$ {product.price.toFixed(2)}</p>
    </article>
  );
}
