import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import type { ProductsBody } from "@/typings/products";
import { FilterForm } from "./components/filter-form";
import { FilterProvider } from "./components/filter-provider";
import { ProductsList } from "./components/products-list";
import "./catalog.scss";

interface CatalogPageProps {
  searchParams: Promise<Partial<ProductsBody>>;
}

export const metadata = {
  title: "Каталог – Shoppe",
  description:
    "Ознакомьтесь с нашим широким выбором красивых украшений и аксессуаров в каталоге Shoppe.",
  openGraph: {
    title: "Зацени нашу новую коллекцию – Shoppe",
    description:
      "Ознакомьтесь с нашим широким выбором красивых украшений и аксессуаров в каталоге Shoppe.",
    url: "https://shoppe.com/catalog",
  },
};

const block = cn("catalog");

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const [{ limit, offset, ...otherParams }, filtersConfig] = await Promise.all([
    searchParams,
    api.products.getFilter(),
  ]);

  const searchParamsWithDefaults = {
    limit: limit || 6,
    offset: offset || 0,
    ...otherParams,
  };

  return (
    <main className={block()}>
      <section className={block("container")}>
        <header className={block("heading")}>
          <h1 className={block("title")}>Каталог товаров</h1>
        </header>

        <FilterProvider searchParams={searchParamsWithDefaults}>
          <FilterForm
            className={block("filter")}
            filterConfig={filtersConfig}
          />

          <div className={block("content")}>
            <ProductsList searchParams={searchParamsWithDefaults} />
          </div>
        </FilterProvider>
      </section>
    </main>
  );
}
