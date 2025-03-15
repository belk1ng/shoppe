import { notFound } from "next/navigation";
import { productsService } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Tabs } from "@/shared/ui";
import { ProductInfo } from "@/widgets/product-info";
import type { ProductPageProps } from "../model/types";
import "./product.scss";

const block = cn("product");

export async function Product({ params }: ProductPageProps) {
  const sku = (await params).sku;

  const product = await productsService
    .getProductBySku(sku)
    .catch(() => notFound());

  return (
    <main className={block()}>
      <ProductInfo className={block("info")} product={product} />
      <Tabs
        className={block("tabs")}
        tabs={[
          { title: "Описание", content: product.description },
          {
            title: `Отзывы (${product.reviews.length})`,
            content: JSON.stringify(product.reviews),
          },
        ]}
      />
    </main>
  );
}
