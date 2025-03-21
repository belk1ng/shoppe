import type { Product as ProductSchema, WithContext } from "schema-dts";
import { getProductAverageRating } from "./getProductAverageRating";
import type { Product } from "../model/types";

export const generateProductJsonLd = (
  product: Product
): WithContext<ProductSchema> => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: getProductAverageRating(product),
      reviewCount: product.reviews.length,
    },
    description: product.description,
    name: product.name,
    image: product.images[0],
    sku: String(product.sku),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: product.price,
      priceCurrency: "USD",
    },
    review: product.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      datePublished: review.date,
      reviewBody: review.description,
      name: review.name,
      reviewRating: {
        "@type": "Rating",
        bestRating: 5,
        ratingValue: review.rating,
        worstRating: 1,
      },
    })),
  };
};
