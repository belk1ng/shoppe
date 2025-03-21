"use server";

import { headers } from "next/headers";

export const getBreadcrumbsOptionsFromHeaders = async () => {
  const headersList = await headers();

  return {
    proto: headersList.get("x-forwarded-proto") ?? "",
    host: headersList.get("x-forwarded-host") ?? "",
    path: headersList.get("x-current-pathname") ?? "",
  };
};
