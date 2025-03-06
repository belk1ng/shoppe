import type {
  AddReviewBody,
  AddReviewResponse,
  FilterResponse,
  ProductsBody,
  ProductsResponse,
  ReviewBody,
  SkuResponse,
} from "@/entities/product";
import { http, HttpClient } from "@/shared/api";

/**
 * A service class for handling product-related operations.
 * Provides methods to fetch products, filters, product details by SKU, and add reviews.
 */
export class ProductsService {
  /**
   * Creates an instance of the ProductsService.
   *
   * @constructor
   * @param {HttpClient} client - An HTTP client instance used for making API requests.
   */
  constructor(private readonly client: HttpClient) {}

  /**
   * Fetches all products from the server.
   *
   * @returns {Promise<ProductsResponse>} A promise that resolves to the fetched products data.
   */
  public async getAllProducts() {
    // NOTE: There are no endpoint to fetch all products
    const temp = await this.getProducts({ offset: 0, limit: 1 });
    return this.getProducts({
      offset: 0,
      limit: temp.totalProducts,
    });
  }

  /**
   * Fetches a list of products based on the provided parameters.
   *
   * @param {ProductsBody} body - Parameters to filter and paginate the products.
   * @returns {Promise<ProductsResponse>} A promise that resolves to the fetched products data.
   */
  public async getProducts(body: ProductsBody): Promise<ProductsResponse> {
    const params = this.client.createSearchParams(body);
    return this.client.get<ProductsResponse>("/products", { params });
  }

  /**
   * Fetches available filters for products.
   *
   * @returns {Promise<FilterResponse>} A promise that resolves to the product filters data.
   */
  public async getFilter(): Promise<FilterResponse> {
    return this.client.get<FilterResponse>("/products/get-filter");
  }

  /**
   * Fetches detailed information about a product by its SKU (Stock Keeping Unit).
   *
   * @param {number} sku - The unique identifier of the product.
   * @returns {Promise<SkuResponse>} A promise that resolves to the product's detailed information.
   */
  public async getProductBySku(sku: number): Promise<SkuResponse> {
    return this.client.get<SkuResponse>(`/products/sku/${sku}`);
  }

  /**
   * Adds a review to a specific product.
   *
   * @param {AddReviewBody} body - The review data including the product SKU.
   * @returns {Promise<AddReviewResponse>} A promise that resolves to the result of adding the review.
   */
  public async addReview(body: AddReviewBody): Promise<AddReviewResponse> {
    const { sku, ...review } = body;
    return this.client.post<AddReviewResponse, ReviewBody>(
      `/products/sku/${sku}/review`,
      {
        body: review,
      }
    );
  }
}

export const productsService = new ProductsService(http);
