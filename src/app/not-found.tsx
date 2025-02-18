import "./not-found.scss";
import Link from "next/link";
import { cn } from "@/lib/cn";

const block = cn("notFound");

export default function NotFound() {
  return (
    <main className={block()}>
      <h1 className={block("title")}>404 ошибка</h1>
      <h2 className={block("subtitle")}>
        Страница не найдена, попробуйте перейти на главную страницу
      </h2>

      <Link href="/">Главная страница</Link>
    </main>
  );
}
