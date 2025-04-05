import { notFound } from "next/navigation";
import { ProductInfo } from "@/widgets/product-info";
import { AddProductReview } from "@/features/add-product-review";
import { productsService } from "@/entities/product";
import { generateProductJsonLd } from "@/entities/product";
import { ReviewCard } from "@/entities/review";
import { cn } from "@/shared/lib";
import { Tabs } from "@/shared/ui";
import { JsonLd } from "@/shared/ui";
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
      <JsonLd data={generateProductJsonLd(product)} id="product-json-ld" />
      <ProductInfo className={block("info")} product={product} />
      <Tabs
        className={block("tabs")}
        tabs={[
          { title: "Описание", content: product.description },
          {
            title: `Отзывы (${product.reviews.length})`,
            scrollIntoView: true,
            content: (
              <div className={block("reviews")}>
                <div className={block("reviewsList")}>
                  {product.reviews.map((review, index) => (
                    <ReviewCard heading="h2" key={index} review={review} />
                  ))}
                </div>

                <AddProductReview
                  className={block("reviewForm")}
                  sku={product.sku}
                />
              </div>
            ),
          },
        ]}
      />
    </main>
  );
}
