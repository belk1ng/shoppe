import { notFound } from "next/navigation";
import { api } from "@/lib/api";

interface ProductPageParams {
  sku: number;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
  const sku = (await params).sku;

  const product = await api.products
    .getProductBySku(sku)
    .catch(() => notFound());

  return {
    title: `${product.name} – Купить онлайн в Shoppe`,
    description: `Посмотрите детали и купите ${product.name} в нашем магазине. Качественные материалы, стильный дизайн и доступные цены!`,
    openGraph: {
      title: `${product.name} – Купить ювелирное украшение онлайн в Shoppe`,
      description: `Ищете ${product.name}? В Shoppe мы предлагаем высококачественные украшения по доступным ценам. Закажите сегодня!`,
      url: `https://shoppe.com/product/${product.sku}`,
      type: "website",
      images: product.images,
    },
  };
};

export const generateStaticParams = async () => {
  const productsResponse = await api.products.getAllProducts();
  return productsResponse.products.map((product) => ({
    sku: product.sku.toString(),
  }));
};

export default async function ProductPage({ params }: ProductPageProps) {
  const sku = (await params).sku;

  const product = await api.products
    .getProductBySku(sku)
    .catch(() => notFound());

  return (
    <main>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
