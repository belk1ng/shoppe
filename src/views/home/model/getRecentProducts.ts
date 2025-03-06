import { productsService } from "@/entities/product";

export const getRecentProducts = async () => {
  const PRODUCTS_PREVIEW_COUNT = 6,
    PRODUCTS_PREVIEW_OFFSET = 0;

  const response = await productsService.getProducts({
    limit: PRODUCTS_PREVIEW_COUNT,
    offset: PRODUCTS_PREVIEW_OFFSET,
  });

  return response.products;
};
