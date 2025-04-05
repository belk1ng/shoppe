"use client";

import Image from "next/image";
import { Cross } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { Counter, PatchedLink } from "@/shared/ui";
import { useCartContext } from "../../model/CartContextProvider";
import type { CartItemSchema } from "../../model/types";
import "./cart-item.scss";

export interface CartItemProps {
  item: CartItemSchema;
  className?: string;
  heading: Heading;
}

const block = cn("cartItem");

export function CartItem({ item, className, heading }: CartItemProps) {
  const { patchCartItemCount, removeCartItem } = useCartContext();

  const Heading = heading;

  return (
    <article className={block("", [className])}>
      <div className={block("wrapper")}>
        <Image
          alt={`Изображение ${item.name}`}
          className={block("image")}
          height={136}
          src={item.image}
          width={136}
        />

        <div className={block("info")}>
          <Heading className={block("name")} lang="en">
            <PatchedLink
              className={block("link")}
              href={`/catalog/${item.sku}`}
            >
              {item.name}
            </PatchedLink>
          </Heading>
          <p className={block("price")}>$ {item.price.toFixed(2)}</p>
        </div>

        <Counter
          className={block("counter")}
          defaultValue={item.count}
          min={0}
          onChange={(count) => patchCartItemCount(item.sku, count)}
        />

        <button
          aria-label={`Удалить ${item.name} из корзины`}
          className={block("button")}
          onClick={() => removeCartItem(item.sku)}
        >
          <Cross aria-hidden />
        </button>
      </div>
    </article>
  );
}
