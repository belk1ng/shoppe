"use client";

import { createSafeContext } from "@/shared/lib";
import { useCart } from "./useCart";

export const [CartContextProvider, useCartContext] = createSafeContext<
  ReturnType<typeof useCart>
>("CartContextProvider not found");
