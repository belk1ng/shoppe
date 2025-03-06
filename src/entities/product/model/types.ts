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

export interface Product {
  name: string;
  price: number;
  discount?: number;
  description: string;
  images: string[];
  categoryId: number;
  sku: number;
  reviews: Review[];
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  description: string;
}

export interface FilterResponse {
  categories: Category[];
  maxPrice: number;
  minPrice: number;
}

export interface Category {
  id: number;
  name: string;
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
