"use client";

import { cn } from "@/lib/cn";
import "./catalog.scss";

interface CatalogErrorProps {
  error: Error;
}

const block = cn("catalogError");

export default function CatalogError({ error }: CatalogErrorProps) {
  return (
    <main className={block()}>
      <h1 className={block("title")}>Что-то пошло не так :(</h1>
      <h2 className={block("subtitle")}>{error.message}</h2>
    </main>
  );
}
