import type { Product } from "@/entities/product";

export const productToCartItem = (product: Product, count: number) => ({
  name: product.name,
  sku: product.sku,
  price: product.price,
  image: product.images[0],
  count,
});
