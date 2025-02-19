import Image from "next/image";
import { Cart, Favorite, Profile } from "@/assets/icons";
import { Navigation, type NavigationItem } from "@/components/navigation";
import { PatchedLink } from "@/components/patched-link";
import { cn } from "@/lib/cn";
import "./header.scss";

const block = cn("header");

const ITEMS: NavigationItem[] = [
  {
    type: "link",
    label: "Каталог",
    path: "/catalog",
  },
  {
    type: "link",
    label: "О нас",
    path: "/about",
  },
  {
    type: "separator",
  },
  {
    type: "link",
    ariaLabel: "Корзина",
    label: <Cart aria-hidden={true} />,
    path: "/cart",
  },
  {
    type: "link",
    ariaLabel: "Избранные товары",
    label: <Favorite aria-hidden={true} />,
    path: "/favorite",
  },
  {
    type: "link",
    ariaLabel: "Профиль",
    label: <Profile aria-hidden={true} />,
    path: "/profile",
  },
];

export function Header() {
  return (
    <header className={block()}>
      <PatchedLink
        aria-label="Go to main page"
        className={block("logo")}
        href="/"
      >
        <Image
          alt="Shop logo"
          aria-hidden={true}
          height={27}
          src="/logo.svg"
          width={129}
        />
      </PatchedLink>

      <Navigation className={block("navigation")} items={ITEMS} />
    </header>
  );
}
