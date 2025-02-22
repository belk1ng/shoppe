import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import type { ProductsBody } from "@/typings/products";
import { FilterForm } from "./components/filter-form";
import { FilterProvider } from "./components/filter-provider";
import { ProductsPagination } from "./components/products-pagination";
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
  const { limit, offset, ...otherSearchParams } = await searchParams;

  const searchParamsWithDefaults = {
    limit: Number(limit) || 6,
    offset: Number(offset) || 0,
    ...otherSearchParams,
  };

  // TODO: Add hoc for catching errors
  const [filtersConfig, productsResponse] = await Promise.all([
    api.products.getFilter(),
    api.products.getProducts(searchParamsWithDefaults),
  ]);

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

          {/*// TODO: Handle not found records*/}
          <div className={block("content")}>
            {productsResponse.products.map((product, index) => (
              <ProductCard heading="h2" key={index} product={product} />
            ))}
          </div>

          <ProductsPagination
            className={block("pagination")}
            limit={searchParamsWithDefaults.limit}
            offset={searchParamsWithDefaults.offset}
            totalCount={productsResponse.totalProducts}
          />
        </FilterProvider>
      </section>
    </main>
  );
}
