import { notFound } from "next/navigation";
import { ProductInfo } from "@/widgets/product-info";
import { productsService } from "@/entities/product";
import { ReviewCard } from "@/entities/review";
import { cn } from "@/shared/lib";
import { Tabs } from "@/shared/ui";
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
            content: (
              <div className={block("reviews")}>
                {product.reviews.map((review, index) => (
                  <ReviewCard heading="h2" key={index} review={review} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </main>
  );
}
