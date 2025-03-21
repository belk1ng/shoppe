import type { Product } from "../model/types";

export const getProductAverageRating = (product: Product) => {
  let totalSum = 0;

  for (const review of product.reviews) {
    totalSum += review.rating;
  }

  return Math.round(totalSum / product.reviews.length);
};
