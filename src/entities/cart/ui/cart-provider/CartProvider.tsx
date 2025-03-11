"use client";

import type { PropsWithChildren } from "react";
import { CartContextProvider } from "../../model/CartContextProvider";
import type { CartValues } from "../../model/types";
import { useCart } from "../../model/useCart";

export interface CartProviderProps {
  cartInitialState?: CartValues;
}

export function CartProvider({
  cartInitialState = [],
  children,
}: PropsWithChildren<CartProviderProps>) {
  const value = useCart(cartInitialState);

  return <CartContextProvider value={value}>{children}</CartContextProvider>;
}
