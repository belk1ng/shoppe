import { Navigation, type NavigationItem } from "@/features/navigation";
import { cn } from "@/shared/lib";
import "./footer.scss";

const block = cn("footer");

const ITEMS: NavigationItem[] = [
  {
    type: "link",
    label: "Контакты",
    path: "/contacts",
  },
  {
    type: "link",
    label: "Условия покупки",
    path: "/terms-of-purchase",
  },
  {
    type: "link",
    label: "Доставка и возврат",
    path: "/shipping-and-refund",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={block()}>
      <Navigation className={block("navigation")} items={ITEMS} />
      <p>&copy; {currentYear} Shoppe</p>
    </footer>
  );
}
