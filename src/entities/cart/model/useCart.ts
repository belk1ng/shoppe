"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounceCallback } from "@/shared/hooks";
import { updateCartCookie } from "./actions";
import { CART_KEY } from "../lib/constants";
import type { CartItem, CartValues } from "../model/types";

export const useCart = (cartInitialItems: CartValues) => {
  const [items, setItems] = useState<CartValues>(cartInitialItems);

  useEffect(() => {
    const persistedItems = localStorage.getItem(CART_KEY);
    if (persistedItems) {
      setItems(JSON.parse(persistedItems));
    }
  }, []);

  const updateLocalStorage = useCallback((items: CartValues) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, []);

  const debouncedUpdateCartCookie = useDebounceCallback(updateCartCookie, 300);

  useEffect(() => {
    updateLocalStorage(items);
    debouncedUpdateCartCookie(items);
  }, [items, updateLocalStorage, debouncedUpdateCartCookie]);

  const itemsCount = useMemo(
    () => items.reduce((acc, curr) => (acc += curr.count), 0),
    [items]
  );

  const getItemCount = useCallback(
    (sku: number) => items.find((item) => item.sku === sku)?.count ?? 0,
    [items]
  );

  const addCartItem = useCallback((item: CartItem) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  const removeCartItem = useCallback((sku: number) => {
    setItems((prev) => prev.filter((item) => item.sku !== sku));
  }, []);

  const patchCartItemCount = useCallback((sku: number, count: number) => {
    setItems((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, count } : item))
    );
  }, []);

  return useMemo(
    () => ({
      items,
      itemsCount,
      addCartItem,
      removeCartItem,
      patchCartItemCount,
      getItemCount,
    }),
    [
      items,
      itemsCount,
      addCartItem,
      removeCartItem,
      patchCartItemCount,
      getItemCount,
    ]
  );
};
