import { notFound } from "next/navigation";
import { productsService } from "@/entities/product";
import { ProductPageProps } from "../model/types";

export const generateMetadata = async ({ params }: ProductPageProps) => {
  const sku = (await params).sku;

  const product = await productsService
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
  const productsResponse = await productsService.getAllProducts();
  return productsResponse.products.map((product) => ({
    sku: product.sku.toString(),
  }));
};
