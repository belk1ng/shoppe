import {
  generateMetadata,
  generateStaticParams,
  Product,
} from "@/views/product";

export const revalidate = 3600;

export { generateMetadata, generateStaticParams };

export default Product;
