"use client";

import { useRouter } from "next/navigation";
import {
  type Dispatch,
  type PropsWithChildren,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";
import { createSafeContext } from "@/lib/createSafeContext";
import type { ProductsBody } from "@/typings/products";

interface FilterContextType {
  filters: ProductsBody;
  isPending: boolean;
  updateFilters: Dispatch<Partial<ProductsBody>>;
}

interface FilterProviderProps {
  searchParams: ProductsBody;
}

const [FilterContextProvider, useFiltersContext] =
  createSafeContext<FilterContextType>("FilterProvider not found");

export function FilterProvider({
  children,
  searchParams,
}: PropsWithChildren<FilterProviderProps>) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    searchParams,
    (prevState, newState: Partial<ProductsBody>) => ({
      ...prevState,
      ...newState,
    })
  );

  const updateFilters = (newFilters: Partial<ProductsBody>) => {
    const updatedState = {
      ...optimisticFilters,
      ...newFilters,
    };

    const newUrlSearchParams = new URLSearchParams();

    Object.entries(updatedState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => newUrlSearchParams.append(key, item));
      } else if (value !== undefined && value !== null) {
        newUrlSearchParams.append(key, value.toString());
      }
    });

    startTransition(() => {
      setOptimisticFilters(updatedState || {});
      router.push(`?${newUrlSearchParams}`);
    });
  };

  const value = useMemo(
    () => ({
      filters: optimisticFilters || {},
      isPending,
      updateFilters,
    }),
    [optimisticFilters, isPending, updateFilters]
  );

  return (
    <FilterContextProvider value={value}>{children}</FilterContextProvider>
  );
}

export { useFiltersContext };
