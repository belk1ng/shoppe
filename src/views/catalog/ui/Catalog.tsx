import {
  EmptyCatalog,
  FilterForm,
  FilterProvider,
  ProductsPagination,
} from "@/features/filter-products";
import { ProductsGrid } from "@/entities/product";
import { cn } from "@/shared/lib";
import { getCatalogFilterAndProducts } from "../model/getCatalogFilterAndProducts";
import type { CatalogPageProps } from "../model/types";
import "./catalog.scss";

const block = cn("catalog");

export async function Catalog({ searchParams }: CatalogPageProps) {
  const { limit, offset, ...otherSearchParams } = await searchParams;

  const searchParamsWithDefaults = {
    limit: limit ?? 6,
    offset: offset ?? 0,
    ...otherSearchParams,
  };

  const [filtersConfig, productsResponse] = await getCatalogFilterAndProducts(
    searchParamsWithDefaults
  );

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

          {productsResponse.products.length > 0 ? (
            <ProductsGrid
              className={block("content")}
              products={productsResponse.products}
            />
          ) : (
            <div
              className={block("content", {
                empty: productsResponse.products.length === 0,
              })}
            >
              <EmptyCatalog />
            </div>
          )}

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
