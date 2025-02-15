"use client";

import Link from "next/link";

import { cn } from "@/utils/cn";
import type { NavigationItem } from "./types";
import { useNavigation } from "./useNavigation";
import "./navigation.scss";

interface NavigationProps {
  className?: string;
}

const ITEMS: NavigationItem[] = [
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
    type: "separator",
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

export function Navigation({ className }: NavigationProps) {
  const { linksRef, activeIndex, isCurrentPage, handleClick, handleKeyDown } =
    useNavigation(ITEMS);

  return (
    <nav className={block("", [className])}>
      <ul className={block("list", { desktop: true })} role="menubar">
        {ITEMS.map((item, index) => {
          if (item.type === "separator") {
            return (
              <li
                aria-hidden="true"
                className={block("separator")}
                key={`separator-${index}`}
                role="separator"
              />
            );
          }

          const activeTabIndex = activeIndex === -1 ? 0 : activeIndex;
          return (
            <li className={block("item")} key={item.path ?? index} role="none">
              <Link
                aria-current={isCurrentPage(item) ? "page" : undefined}
                className={block("link")}
                href={item.path}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(node) => {
                  linksRef.current[index] = node;
                }}
                role="menuitem"
                tabIndex={index === activeTabIndex ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
