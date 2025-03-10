import type { Product } from "../model/types";

export const getProductAverageRating = (product: Product) => {
  let reviewsCount = 0,
    totalSum = 0;

  for (const review of product.reviews) {
    totalSum += review.rating;
    reviewsCount++;
  }

  return Math.round(totalSum / reviewsCount);
};
