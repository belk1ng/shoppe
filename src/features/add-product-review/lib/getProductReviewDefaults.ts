import type { AddReviewState } from "../model/types";

export const getProductReviewDefaults = (sku: number): AddReviewState => ({
  data: {
    name: "",
    email: "",
    review: "",
    rating: 0,
    sku,
  },
  hasSent: false,
});
