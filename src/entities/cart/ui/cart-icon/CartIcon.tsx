"use client";

import { Cart } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { useCartContext } from "../../model/CartContextProvider";
import "./cart-icon.scss";

const block = cn("cartIcon");

export function CartIcon() {
  const { itemsCount } = useCartContext();

  return (
    <div className={block()}>
      {itemsCount > 0 && (
        <output aria-live="polite" className={block("badge")}>
          {itemsCount}
          <span className="visuallyHidden">товаров в корзине</span>
        </output>
      )}
      <Cart />
    </div>
  );
}
