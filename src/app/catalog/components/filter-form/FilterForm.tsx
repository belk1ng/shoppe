"use client";

import type { SyntheticEvent } from "react";
import { Search } from "@/assets/icons";
import { Input } from "@/components/input";
import { cn } from "@/lib/cn";
import type { FilterResponse } from "@/typings/products";
import { useFiltersContext } from "../filter-provider";
import "./filter-form.scss";

export interface FilterFormProps {
  className?: string;
  filterConfig: FilterResponse;
}

const block = cn("productsFilterForm");

export function FilterForm({ className, filterConfig }: FilterFormProps) {
  const { filters, updateFilters } = useFiltersContext();

  const handleFormChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    updateFilters({ [name]: value, offset: 0 });
  };

  return (
    <form
      className={block("", [className])}
      onChange={handleFormChange}
      onSubmit={(event) => event.preventDefault()}
      role="search"
    >
      <Input
        defaultValue={filters.name}
        endIcon={<Search />}
        label="Название"
        name="name"
        placeholder="Поиск"
      />

      <select
        className={block("category")}
        defaultValue={filters.categoryId ?? ""}
        name="categoryId"
      >
        <option value="">Не выбрано</option>
        {filterConfig.categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  );
}
