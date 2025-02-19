import { api } from "@/lib/api";
import type { ProductsBody } from "@/typings/products";

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

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const { limit = 6, offset = 0, ...params } = await searchParams;

  const products = await api.products.getProducts({ limit, offset, ...params });

  return (
    <main>
      <h1>Catalog page</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}
