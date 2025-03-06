import { notFound } from "next/navigation";
import { productsService } from "@/entities/product";
import type { ProductPageProps } from "../model/types";

export async function Product({ params }: ProductPageProps) {
  const sku = (await params).sku;

  const product = await productsService
    .getProductBySku(sku)
    .catch(() => notFound());

  return (
    <main>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
