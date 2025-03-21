import Script from "next/script";
import type { Thing, WithContext } from "schema-dts";

export interface JsonLdProps {
  id: string;
  data: WithContext<Thing>;
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id={id}
      type="application/ld+json"
    />
  );
}
