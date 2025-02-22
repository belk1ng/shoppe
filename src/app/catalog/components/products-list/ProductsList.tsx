import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";
import type { ProductsBody } from "@/typings/products";

export interface ProductsListProps {
  searchParams: ProductsBody;
}

export async function ProductsList({ searchParams }: ProductsListProps) {
  const products = await api.products.getProducts(searchParams);

  return (
    <>
      {products.products.map((product, index) => (
        <ProductCard heading="h2" key={index} product={product} />
      ))}
    </>
  );
}
