import { ProductsGrid } from "@/entities/product";
import { cn } from "@/shared/lib/cn";
import { PatchedLink } from "@/shared/ui/progress-bar";
import { getRecentProducts } from "../model/getRecentProducts";
import "./home.scss";

const block = cn("home");

export async function Home() {
  const products = await getRecentProducts();

  return (
    <main className={block()}>
      <h1 className="visuallyHidden">Главная страница</h1>

      <section>
        <header className={block("heading")}>
          <h2 className={block("title")}>Последние поступления</h2>
          <PatchedLink className={block("link")} href="/catalog">
            Все
          </PatchedLink>
        </header>

        <ProductsGrid className={block("products")} products={products} />
      </section>
    </main>
  );
}
