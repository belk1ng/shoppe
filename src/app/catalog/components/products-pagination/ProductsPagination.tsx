"use client";

import { Pagination, type PaginationProps } from "@/components/pagination";
import { useProductsFilter } from "../filter-provider";

export function ProductsPagination({
  totalCount,
  className,
}: Omit<PaginationProps, "onChange">) {
  const { updateFilters, filters } = useProductsFilter();

  if (!totalCount) {
    return null;
  }

  const handlePaginationChange: PaginationProps["onChange"] = ({
    limit,
    offset,
  }) => {
    updateFilters({
      limit,
      offset,
    });
  };

  return (
    <Pagination
      className={className}
      limit={filters.limit}
      offset={filters.offset}
      onChange={handlePaginationChange}
      totalCount={totalCount}
    />
  );
}
