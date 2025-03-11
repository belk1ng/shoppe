"use client";

import type { PropsWithChildren } from "react";
import { CartContextProvider } from "../../model/CartContextProvider";
import { useCart } from "../../model/useCart";

export function CartProvider({ children }: PropsWithChildren) {
  const value = useCart();

  return <CartContextProvider value={value}>{children}</CartContextProvider>;
}
