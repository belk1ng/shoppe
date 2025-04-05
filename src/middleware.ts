import { withCurrentPathname } from "@/app/withCurrentPathname";
import { withAuth } from "@/entities/user";
import { middlewarePipeline } from "@/shared/model";

// TODO: Add redirect from auth pages to catalog for authenticated users
export const middleware = middlewarePipeline([withCurrentPathname, withAuth]);

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
