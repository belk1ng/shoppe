import { HttpClient } from "./http";
import { ProductsService } from "./services/products";

/**
 * A class that serves as the main entry point for interacting with the API.
 * It initializes and provides access to various service classes, such as ProductsService.
 */
class API {
  /**
   * The HTTP client instance used for making API requests.
   *
   * @type {HttpClient}
   * @private
   */
  private readonly client: HttpClient;

  /**
   * An instance of the ProductsService for handling product-related operations.
   *
   * @type {ProductsService}
   */
  public products: ProductsService;

  /**
   * Creates an instance of the API class.
   * Initializes the HTTP client and sets up service instances.
   *
   * @constructor
   * @param {string} baseUrl - The base URL of the API endpoint.
   */
  constructor(baseUrl: string) {
    this.client = new HttpClient(baseUrl);
    this.products = new ProductsService(this.client);
  }
}

/**
 * An instance of the API class configured with the base URL from environment variables.
 * This is the main export and should be used to interact with the API throughout the application.
 */
export const api = new API(process.env.NEXT_PUBLIC_API_BASE_URL);
