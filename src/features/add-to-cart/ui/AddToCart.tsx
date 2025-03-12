"use client";

import type { Product } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Button, Counter } from "@/shared/ui";
import "./add-to-cart.scss";
import { useAddToCart } from "../model/useAddToCart";

export interface AddToCartProps {
  className?: string;
  product: Product;
}

const block = cn("addToCart");

export function AddToCart({ className, product }: AddToCartProps) {
  const { productCount, addProductToCart, updateProductCount } =
    useAddToCart(product);

  return (
    <div className={block("", [className])}>
      {productCount ? (
        <>
          <Button className={block("button")} variant="outlined-black">
            Уже в корзине
          </Button>
          <Counter
            className={block("counter")}
            defaultValue={productCount}
            onChange={updateProductCount}
          />
        </>
      ) : (
        <Button
          className={block("button")}
          onClick={addProductToCart}
          variant="contained-black"
        >
          Добавить в корзину
        </Button>
      )}
    </div>
  );
}
