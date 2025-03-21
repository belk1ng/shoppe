import type { AddReviewBody, ReviewBody } from "@/entities/product";

export interface AddReviewState {
  data: AddReviewBody;
  hasSent: boolean;
  errors?: Partial<Record<keyof ReviewBody, string[]>>;
}
