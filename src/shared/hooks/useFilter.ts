import { useRouter } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";

/**
 * A custom React hook for managing and updating filter states in a URL-friendly manner.
 * It uses optimistic updates to provide a smooth user experience and supports
 * transitioning states to avoid blocking the UI.
 *
 * @returns {{
 *   filters: FilterState,          // The current optimistic filter state.
 *   updateFilter: (newFilters: Partial<FilterState>) => void, // Function to update the filters.
 *   isPending: boolean             // Indicates if a transition is pending (e.g., during URL updates).
 * }} An object containing the current filters, a function to update them, and a pending state.
 *
 * @template FilterState - A generic type representing the filter state, which must be an object.
 *
 * @param {FilterState} values - The initial filter state values.
 *
 * @example
 * const { filters, updateFilter, isPending } = useFilter({ category: 'books', price: 20 });
 * updateFilter({ price: 30 }); // Updates the price filter and reflects it in the URL.
 */
export const useFilter = <FilterState extends Record<string, unknown>>(
  values: FilterState
) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [optimisticFilter, setOptimisticFilter] = useOptimistic(
    values,
    (prevState, newState: Partial<FilterState>) => ({
      ...prevState,
      ...newState,
    })
  );

  const updateFilter = useCallback(
    (filter: Partial<FilterState>, callback?: VoidFunction) => {
      const updatedFilter = {
        ...optimisticFilter,
        ...filter,
      };

      const newUrlSearchParams = new URLSearchParams();
      Object.entries(updatedFilter).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => newUrlSearchParams.append(key, item));
        } else if (value !== undefined && value !== null) {
          newUrlSearchParams.append(key, value.toString());
        }
      });

      startTransition(() => {
        setOptimisticFilter(updatedFilter || {});
        router.push(`?${newUrlSearchParams}`);
        callback?.();
      });
    },
    [optimisticFilter, setOptimisticFilter, router]
  );

  return {
    filter: optimisticFilter,
    updateFilter,
    isPending,
  } as const;
};
