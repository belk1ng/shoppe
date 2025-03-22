"use client";

import { CartItem, useCartContext } from "@/entities/cart";
import { cn } from "@/shared/lib";
import "./cart.scss";

const block = cn("cart");

export function Cart() {
  const { items } = useCartContext();

  return (
    <main className={block()}>
      <h1 className={block("title")}>Корзина</h1>

      <section className={block("items")}>
        <h2 className="visuallyHidden">Товары в корзине</h2>
        {items.map((item) => (
          <CartItem
            className={block("item")}
            heading="h3"
            item={item}
            key={item.sku}
          />
        ))}
      </section>

      <section className={block("payment")}>
        <h2 className="visuallyHidden">Оплатить товары</h2>
        Оплатить
      </section>
    </main>
  );
}
