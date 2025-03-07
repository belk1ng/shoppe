import { Category, Product } from "../model/types";

export type ProductsBody = {
  limit: number;
  offset: number;
  name?: string;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number;
  discounted?: boolean;
};

export interface ProductsResponse {
  totalProducts: number;
  limit: number;
  offset: number;
  products: Product[];
}

export interface FilterResponse {
  categories: Category[];
  maxPrice: number;
  minPrice: number;
}

export type SkuResponse = Product;

export type ReviewBody = {
  name: string;
  email: string;
  rating: number;
  review: string;
};

export type AddReviewBody = ReviewBody & {
  sku: number;
};

export interface AddReviewResponse {
  success: boolean;
  message: string;
}
