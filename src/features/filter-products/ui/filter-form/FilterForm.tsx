"use client";

import type { SyntheticEvent } from "react";
import { FilterResponse } from "@/entities/product";
import { Search } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/cn";
import { Input } from "@/shared/ui/input";
import { useProductsFilter } from "../../model/FilterProvider";
import "./filter-form.scss";

export interface FilterFormProps {
  className?: string;
  filterConfig: FilterResponse;
}

const block = cn("productsFilterForm");

export function FilterForm({ className, filterConfig }: FilterFormProps) {
  const { filters, updateFilter } = useProductsFilter();

  const handleFormChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    updateFilter({ [name]: value, offset: 0 });
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
