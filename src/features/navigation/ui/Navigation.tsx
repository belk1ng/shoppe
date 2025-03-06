"use client";

import { cn } from "@/shared/lib/cn";
import { PatchedLink } from "@/shared/ui/progress-bar";
import type { NavigationItem } from "../model/types";
import { useNavigation } from "../model/useNavigation";
import "./navigation.scss";

interface NavigationProps {
  className?: string;
  items: NavigationItem[];
}

const block = cn("navigation");

export function Navigation({ className, items }: NavigationProps) {
  const { linksRef, activeIndex, isCurrentPage, handleClick, handleKeyDown } =
    useNavigation(items);

  return (
    <nav className={block("", [className])}>
      <ul className={block("list")} role="menubar">
        {items.map((item, index) => {
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
              <PatchedLink
                aria-current={isCurrentPage(item) ? "page" : undefined}
                aria-label={item.ariaLabel}
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
              </PatchedLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
