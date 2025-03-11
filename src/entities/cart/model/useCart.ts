"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CART_PERSIST } from "../lib/constants";
import type { CartItem, CartValues } from "../model/types";

export const useCart = () => {
  const [items, setItems] = useState<CartValues>([]);

  useEffect(() => {
    const persistedItems = localStorage.getItem(CART_PERSIST);
    if (persistedItems) {
      setItems(JSON.parse(persistedItems));
    }
  }, []);

  const updateLocalStorage = useCallback((items: CartValues) => {
    localStorage.setItem(CART_PERSIST, JSON.stringify(items));
  }, []);

  useEffect(() => {
    updateLocalStorage(items);
  }, [items, updateLocalStorage]);

  const itemsCount = useMemo(
    () => items.reduce((acc, curr) => (acc += curr.count), 0),
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
    }),
    [items, itemsCount, addCartItem, removeCartItem, patchCartItemCount]
  );
};
