"use client";

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
  const { getItemCount, patchCartItemCount, addCartItem, removeCartItem } =
    useCartContext();

  const count = getItemCount(product.sku);

  if (count) {
    return (
      <div className={block("", [className])}>
        <Button className={block("button")} variant="outlined-black">
          Уже в корзине
        </Button>
        <Counter
          className={block("counter")}
          defaultValue={count}
          onChange={(value) => {
            if (value === 0) {
              removeCartItem(product.sku);
            } else {
              patchCartItemCount(product.sku, value);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={block("", [className])}>
      <Button
        className={block("button")}
        onClick={() =>
          addCartItem({
            name: product.name,
            sku: product.sku,
            price: product.price,
            image: product.images[0],
            count: 1,
          })
        }
        variant="contained-black"
      >
        Добавить в корзину
      </Button>
    </div>
  );
}
