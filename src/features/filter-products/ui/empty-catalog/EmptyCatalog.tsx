import { cn } from "@/shared/lib";
import "./empty-catalog.scss";

const block = cn("emptyCatalog");

export function EmptyCatalog() {
  return (
    <div className={block()}>
      <h2 className={block("title")}>По вашему запросу ничего не найдено :(</h2>
    </div>
  );
}
