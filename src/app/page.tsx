import { api } from "@/lib/api";

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

export default async function Home() {
  const products = await getRecentProducts();

  return (
    <main>
      <h1>Home page</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}
