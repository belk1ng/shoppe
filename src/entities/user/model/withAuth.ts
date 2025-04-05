import { NextResponse } from "next/server";
import {
  clearJwtToken,
  getBearer,
  type MiddlewareFactory,
} from "@/shared/model";
import { userService } from "../api/userService";

export const withAuth: MiddlewareFactory = (next) => {
  return async (request, _next) => {
    const pathname = request.nextUrl.pathname;

    if (/^\/(profile|favorite)/.test(pathname)) {
      try {
        await userService.getUserProfile({
          headers: new Headers({
            Authorization: await getBearer(),
          }),
        });
      } catch {
        await clearJwtToken();
        return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
      }
    }

    return next(request, _next);
  };
};
