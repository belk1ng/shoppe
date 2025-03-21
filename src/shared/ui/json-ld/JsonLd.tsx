import type { Thing, WithContext } from "schema-dts";

export interface JsonLdProps {
  data: WithContext<Thing>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
