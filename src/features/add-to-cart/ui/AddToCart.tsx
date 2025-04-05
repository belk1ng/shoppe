"use client";

import { useRouter } from "next/navigation";
import { productToCartItem } from "@/features/add-to-cart/lib/productToCartItem";
import { useCartContext } from "@/entities/cart";
import type { Product } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Button, Counter } from "@/shared/ui";
import "./add-to-cart.scss";

export interface AddToCartProps {
  className?: string;
  product: Product;
}

const block = cn("addToCart");

export function AddToCart({ className, product }: AddToCartProps) {
  const { getItemCount, addCartItem, patchCartItemCount } = useCartContext();

  const router = useRouter();

  const onAlreadyInCartClick = () => {
    router.push("/cart");
  };

  const productCount = getItemCount(product.sku);

  return (
    <div className={block("", [className])}>
      {productCount ? (
        <>
          <Button
            aria-label="Перейти в корзину"
            className={block("button")}
            onClick={onAlreadyInCartClick}
            variant="outlined-black"
          >
            Уже в корзине
          </Button>
          <Counter
            className={block("counter")}
            defaultValue={productCount}
            onChange={(count) => patchCartItemCount(product.sku, count)}
          />
        </>
      ) : (
        <Button
          className={block("button")}
          onClick={() => addCartItem(productToCartItem(product, 1))}
          variant="contained-black"
        >
          Добавить в корзину
        </Button>
      )}
    </div>
  );
}
