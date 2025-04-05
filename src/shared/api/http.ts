/**
 * Represents the supported HTTP methods for making requests.
 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Defines a key-value pair object for search parameters.
 * Each key maps to a value that can be a boolean, number, string, array of strings, or null/undefined.
 */
export interface SearchParams {
  [key: string]: boolean | number | string | string[] | null | undefined;
}

/**
 * Represents the base options for making HTTP requests.
 * Extends `RequestInit` by omitting the `body` property and adding custom properties like `body` and `params`.
 *
 * @template Body - The type of the request body.
 */
export type BaseRequestOptions<Body> = Omit<RequestInit, "body"> & {
  /**
   * The request body (optional). Its type depends on the HTTP method and use case.
   */
  body?: Body;

  /**
   * Query parameters as a `URLSearchParams` object (optional).
   */
  params?: URLSearchParams;
};

/**
 * Represents the base options for making HTTP requests without `body` property.
 * Extends `BaseRequestOptions` by omitting the `body` property.
 */
export type BaseSimpleRequestOptions = Omit<
  BaseRequestOptions<undefined>,
  "body"
>;

/**
 * A class for making HTTP requests to a specified base URL.
 */
export class HttpClient {
  /**
   * The base URL for all HTTP requests made by this client.
   *
   * @private
   * @readonly
   */
  private readonly baseUrl: string;

  /**
   * Creates an instance of the `HttpClient` with a specified base URL.
   *
   * @constructor
   * @param baseUrl - The base URL for all HTTP requests.
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Makes an HTTP request to the specified endpoint with the given method and options.
   *
   * @private
   * @template Response - The expected type of the response data.
   * @template Body - The type of the request body.
   * @param endpoint - The endpoint path relative to the base URL.
   * @param method - The HTTP method to use (e.g., "GET", "POST").
   * @param options - Additional options for the request, including headers, body, and query parameters.
   * @returns A promise that resolves to the parsed JSON response.
   * @throws An error if the HTTP response status is not OK.
   */
  private async request<Response, Body = undefined>(
    endpoint: string,
    method: HttpMethod,
    options: BaseRequestOptions<Body> = {}
  ): Promise<Response> {
    const { headers = {}, body, params, ...otherOptions } = options;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...otherOptions,
    };

    if (body !== undefined && ["POST", "PUT", "PATCH"].includes(method)) {
      fetchOptions.body = JSON.stringify(body);
    }

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<Response>;
  }

  /**
   * Converts a `SearchParams` object into a `URLSearchParams` object for use in query strings.
   *
   * @param params - The search parameters to convert.
   * @returns A `URLSearchParams` object representing the query string.
   */
  public createSearchParams(params: SearchParams): URLSearchParams {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
          value.forEach((currentValue) =>
            searchParams.append(key, currentValue)
          );
        } else {
          searchParams.set(key, value.toString());
        }
      }
    }
    return searchParams;
  }

  /**
   * Sends a GET request to the specified URL.
   *
   * @template Response - The expected type of the response data.
   * @param url - The endpoint path relative to the base URL.
   * @param options - Additional options for the request, excluding the body.
   * @returns A promise that resolves to the parsed JSON response.
   */
  public get<Response>(
    url: string,
    options: BaseSimpleRequestOptions = {}
  ): Promise<Response> {
    return this.request<Response>(url, "GET", options);
  }

  /**
   * Sends a POST request to the specified URL.
   *
   * @template Response - The expected type of the response data.
   * @template Body - The type of the request body.
   * @param url - The endpoint path relative to the base URL.
   * @param options - Additional options for the request, including the body.
   * @returns A promise that resolves to the parsed JSON response.
   */
  public post<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "POST", options);
  }

  /**
   * Sends a PUT request to the specified URL.
   *
   * @template Response - The expected type of the response data.
   * @template Body - The type of the request body.
   * @param url - The endpoint path relative to the base URL.
   * @param options - Additional options for the request, including the body.
   * @returns A promise that resolves to the parsed JSON response.
   */
  public put<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "PUT", options);
  }

  /**
   * Sends a PATCH request to the specified URL.
   *
   * @template Response - The expected type of the response data.
   * @template Body - The type of the request body.
   * @param url - The endpoint path relative to the base URL.
   * @param options - Additional options for the request, including the body.
   * @returns A promise that resolves to the parsed JSON response.
   */
  public patch<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "PATCH", options);
  }

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @template Response - The expected type of the response data.
   * @param url - The endpoint path relative to the base URL.
   * @param options - Additional options for the request, excluding the body.
   * @returns A promise that resolves to the parsed JSON response.
   */
  public delete<Response>(
    url: string,
    options: BaseSimpleRequestOptions = {}
  ): Promise<Response> {
    return this.request<Response>(url, "DELETE", options);
  }
}

export const http = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL);
