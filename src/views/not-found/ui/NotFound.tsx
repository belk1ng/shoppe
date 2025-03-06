import { cn } from "@/shared/lib/cn";
import { PatchedLink } from "@/shared/ui/progress-bar";
import "./not-found.scss";

const block = cn("notFound");

export function NotFound() {
  return (
    <main className={block()}>
      <h1 className={block("title")}>404 ошибка</h1>
      <h2 className={block("subtitle")}>
        Страница не найдена, попробуйте перейти на главную страницу
      </h2>

      <PatchedLink className={block("link")} href="/">
        Главная страница
      </PatchedLink>
    </main>
  );
}
