"use client";

import {
  type Dispatch,
  type PropsWithChildren,
  useCallback,
  useMemo,
} from "react";
import type { ProductsBody } from "@/entities/product";
import { createSafeContext, useProgressBar } from "@/shared/lib";
import { useFilter } from "@/shared/model";

interface ProductsFilterProviderValue {
  filters: ProductsBody;
  isPending: boolean;
  updateFilter: Dispatch<Partial<ProductsBody>>;
}

interface ProductsFilterProviderProps {
  searchParams: ProductsBody;
}

const [ProductsFilterProvider, useProductsFilter] =
  createSafeContext<ProductsFilterProviderValue>("FilterProvider not found");

export function FilterProvider({
  children,
  searchParams,
}: PropsWithChildren<ProductsFilterProviderProps>) {
  const { filter, updateFilter, isPending } = useFilter(searchParams);

  const progress = useProgressBar();

  const onUpdateFilter = useCallback(
    (filter: Partial<ProductsBody>) => {
      progress.start();
      updateFilter(filter, progress.done);
    },
    [updateFilter, progress]
  );

  const value = useMemo(
    () => ({
      filters: filter,
      isPending,
      updateFilter: onUpdateFilter,
    }),
    [filter, isPending, onUpdateFilter]
  );

  return (
    <ProductsFilterProvider value={value}>{children}</ProductsFilterProvider>
  );
}

export { useProductsFilter };
