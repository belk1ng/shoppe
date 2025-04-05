import { type MiddlewareFactory } from "@/shared/model";

export const withCurrentPathname: MiddlewareFactory = (next) => {
  return async (request, _next) => {
    const response = await next(request, _next);
    if (response) {
      response.headers.set("x-current-pathname", request.nextUrl.pathname);
    }

    return response;
  };
};
