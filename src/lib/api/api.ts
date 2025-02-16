import { HttpClient } from "./http";
import { ProductsService } from "./services/products";

class API {
  private readonly client: HttpClient;

  public products: ProductsService;

  constructor(baseUrl: string) {
    this.client = new HttpClient(baseUrl);
    this.products = new ProductsService(this.client);
  }
}

export const api = new API("https://purpleschool.ru/api-demo");
