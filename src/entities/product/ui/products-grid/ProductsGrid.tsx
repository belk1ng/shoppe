import { cn } from "@/shared/lib/cn";
import type { Product } from "../../model/types";
import { ProductCard, type ProductCardProps } from "../product-card";
import "./products-grid.scss";

export interface ProductsGridProps {
  products: Product[];
  productHeading?: ProductCardProps["heading"];
  className?: string;
}

const block = cn("productsGrid");

export function ProductsGrid({
  products,
  className,
  productHeading,
}: ProductsGridProps) {
  return (
    <div className={block("", [className])}>
      {products.map((product, index) => (
        <ProductCard heading={productHeading} key={index} product={product} />
      ))}
    </div>
  );
}
