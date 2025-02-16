import type {
  AddReviewBody,
  AddReviewResponse,
  FilterResponse,
  ProductsBody,
  ProductsResponse,
  ReviewBody,
  SkuResponse,
} from "@/typings/products";
import { HttpClient } from "../http";

export class ProductsService {
  constructor(private readonly client: HttpClient) {}

  public async getProducts(body: ProductsBody) {
    const params = this.client.createSearchParams(body);
    return this.client.get<ProductsResponse>("/products", {
      params,
    });
  }

  public async getFilter() {
    return this.client.get<FilterResponse>("/products/get-filter");
  }

  public async getProductBySku(sku: number) {
    return this.client.get<SkuResponse>(`/products/sku/${sku}`);
  }

  public addReview(body: AddReviewBody) {
    const { sku, ...review } = body;

    return this.client.post<AddReviewResponse, Omit<ReviewBody, "sku">>(
      `/products/sku/${sku}/review`,
      {
        body: review,
      }
    );
  }
}
