import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const headers = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  response.headers.set("x-current-pathname", request.nextUrl.pathname);

  return response;
};
