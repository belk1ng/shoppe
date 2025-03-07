import { Review } from "@/entities/review/@x/product";

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

export interface Category {
  id: number;
  name: string;
}
