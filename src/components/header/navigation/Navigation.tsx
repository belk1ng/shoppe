import Link from "next/link";
import { cn } from "@/utils/cn";
import "./navigation.scss";

const ITEMS = [
  {
    type: "link",
    label: "Catalog",
    path: "/catalog",
  },
  {
    type: "link",
    label: "About",
    path: "/about",
  },
  {
    type: "link",
    label: "Cart",
    path: "/cart",
  },
  {
    type: "link",
    label: "Favorite",
    path: "/favorite",
  },
  {
    type: "link",
    label: "Profile",
    path: "/profile",
  },
];

const block = cn("navigation");

export function Navigation() {
  return (
    <nav className={block()}>
      <ul className={block("list")} role="menubar">
        {ITEMS.map((item, index) => (
          <li className={block("item")} key={item.path ?? index} role="none">
            <Link className={block("link")} href={item.path} role="menuitem">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
