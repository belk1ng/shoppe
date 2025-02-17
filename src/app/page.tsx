import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import "./home.scss";

export const metadata = {
  title: "Ваш ювелирный рай – Shoppe",
  description:
    "Добро пожаловать в магазин Shoppe, где вы найдете изысканные украшения и аксессуары на любой случай жизни.",
  openGraph: {
    url: "https://shoppe.com/",
    title: "Shoppe – Магазин красивых украшений и аксессуаров онлайн",
    description:
      "Познакомьтесь с коллекцией потрясающих украшений и аксессуаров Shoppe, которые подчеркнут ваш стиль.",
  },
};

const getRecentProducts = async () => {
  const PRODUCTS_PREVIEW_COUNT = 6,
    PRODUCTS_PREVIEW_OFFSET = 0;

  const response = await api.products.getProducts({
    limit: PRODUCTS_PREVIEW_COUNT,
    offset: PRODUCTS_PREVIEW_OFFSET,
  });

  return response.products;
};

const block = cn("home");

export default async function Home() {
  const products = await getRecentProducts();

  return (
    <main className={block()}>
      <h1 className="visuallyHidden">Главная страница</h1>

      <section>
        <header className={block("heading")}>
          <h2 className={block("title")}>Последние поступления</h2>
          <Link className={block("link")} href="/catalog">
            Все
          </Link>
        </header>

        <div className={block("products")}>
          {products.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
