export interface ProductPageParams {
  sku: number;
}

export interface ProductPageProps {
  params: Promise<ProductPageParams>;
}
