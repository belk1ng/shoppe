"use server";

import { productsService } from "@/entities/product";
import { ReviewSchema } from "./schema";
import type { AddReviewState } from "./types";

export const createReview = async (
  prevState: AddReviewState,
  formData: FormData
) => {
  const state: AddReviewState = {
    data: {
      review: formData.get("review") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      rating: Number(formData.get("rating")),
      sku: prevState.data.sku,
    },
    hasSent: false,
  };

  const { data } = state;
  const validated = ReviewSchema.safeParse(data);

  if (validated.success) {
    await productsService.addReview(data);
    state.hasSent = true;
  } else {
    state.errors = {
      ...validated.error.flatten().fieldErrors,
    };
  }

  return state;
};
