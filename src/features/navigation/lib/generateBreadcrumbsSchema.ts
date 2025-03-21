import type { BreadcrumbList, WithContext } from "schema-dts";
import { BREADCRUMBS } from "@/shared/config/navigation";

interface GenerateBreadcrumbsOptions {
  proto: string;
  host: string;
  path: string;
  override?: Record<string, string>;
}

const getBreadcrumbName = ({
  path,
  override,
}: Pick<GenerateBreadcrumbsOptions, "path" | "override">) => {
  return (
    {
      ...BREADCRUMBS,
      ...override,
    }[path] ?? "Страница не найдена"
  );
};

export const generateBreadcrumbsSchema = ({
  proto,
  host,
  path,
  override,
}: GenerateBreadcrumbsOptions) => {
  const origin = `${proto}://${host}`;
  const segments = path.split("/");

  let uri = "";

  const breadcrumbs: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, index) => {
      uri += segment || "/";

      return {
        "@type": "ListItem",
        position: index + 1,
        name: getBreadcrumbName({ path: uri, override }),
        item: origin + uri,
      };
    }),
  };

  return breadcrumbs;
};
