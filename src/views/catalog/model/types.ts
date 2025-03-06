import { ProductsBody } from "@/entities/product";

export interface CatalogPageProps {
  searchParams: Promise<Partial<ProductsBody>>;
}
