import Image from "next/image";
import { CartIcon } from "@/entities/cart";
import { Navigation, type NavigationItem } from "@/features/navigation";
import { Favorite, Profile } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { PatchedLink } from "@/shared/ui";
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
    label: <CartIcon />,
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
