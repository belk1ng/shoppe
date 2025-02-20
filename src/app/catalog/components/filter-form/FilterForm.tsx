import { Search } from "@/assets/icons";
import { Input } from "@/components/input";
import { cn } from "@/lib/cn";

export interface FilterFormProps {
  className?: string;
}

const block = cn("productsFilterForm");

export function FilterForm({ className }: FilterFormProps) {
  return (
    <form className={block("", [className])} role="search">
      <Input
        endIcon={<Search />}
        label="Название"
        name="name"
        placeholder="Поиск"
      />
    </form>
  );
}
