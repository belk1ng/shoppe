import type { ItemList, WithContext } from "schema-dts";
import { generateProductJsonLd } from "./generateProductJsonLd";
import type { Product } from "../model/types";

export const generateProductsListJsonLd = (
  products: Product[],
  override?: Partial<ItemList>
): WithContext<ItemList> => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateProductJsonLd(product),
    })),
    ...override,
  };
};
