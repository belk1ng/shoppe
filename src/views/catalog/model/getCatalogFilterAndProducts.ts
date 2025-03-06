import { ProductsBody, productsService } from "@/entities/product";

export const getCatalogFilterAndProducts = async (
  searchParams: ProductsBody
) => {
  return await Promise.all([
    productsService.getFilter(),
    productsService.getProducts(searchParams),
  ]);
};
