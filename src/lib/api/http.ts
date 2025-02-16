type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface SearchParams {
  [key: string]: boolean | number | string | string[] | null | undefined;
}

type BaseRequestOptions<Body> = Omit<RequestInit, "body"> & {
  body?: Body;
  params?: URLSearchParams;
};

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

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

  public createSearchParams(params: SearchParams) {
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

  public get<Response>(
    url: string,
    options: Omit<BaseRequestOptions<undefined>, "body"> = {}
  ): Promise<Response> {
    return this.request<Response>(url, "GET", options);
  }

  public post<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "POST", options);
  }

  public put<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "PUT", options);
  }

  public patch<Response, Body>(
    url: string,
    options: BaseRequestOptions<Body>
  ): Promise<Response> {
    return this.request<Response, Body>(url, "PATCH", options);
  }

  public delete<Response>(
    url: string,
    options: Omit<BaseRequestOptions<undefined>, "body"> = {}
  ): Promise<Response> {
    return this.request<Response>(url, "DELETE", options);
  }
}
