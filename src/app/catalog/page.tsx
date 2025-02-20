import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import type { ProductsBody } from "@/typings/products";
import { FilterForm } from "./components/filter-form";
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
  const { limit = 6, offset = 0, ...params } = await searchParams;

  const products = await api.products.getProducts({ limit, offset, ...params });

  return (
    <main className={block()}>
      <section className={block("container")}>
        <header className={block("heading")}>
          <h1 className={block("title")}>Каталог товаров</h1>
        </header>

        <FilterForm className={block("filter")} />

        <div className={block("content")}>
          {products.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
