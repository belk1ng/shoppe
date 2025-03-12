import { useCartContext } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { productToCartItem } from "../lib/productToCartItem";

export const useAddToCart = (product: Product) => {
  const { getItemCount, patchCartItemCount, addCartItem, removeCartItem } =
    useCartContext();

  const productCount = getItemCount(product.sku);

  const addProductToCart = () => {
    addCartItem(productToCartItem(product, 1));
  };

  const updateProductCount = (count: number) => {
    if (count === 0) {
      removeCartItem(product.sku);
    } else {
      patchCartItemCount(product.sku, count);
    }
  };

  return {
    productCount,
    addProductToCart,
    updateProductCount,
  };
};
