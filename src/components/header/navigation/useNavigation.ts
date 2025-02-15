import { usePathname } from "next/navigation";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { NavigationItem } from "./types";

export const useNavigation = (items: NavigationItem[]) => {
  const pathname = usePathname();

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const isCurrentPage = useCallback(
    (item: NavigationItem) => {
      if (item.type === "link") {
        return pathname.includes(item.path);
      }

      return false;
    },
    [pathname]
  );

  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (linksRef.current?.length) {
      linksRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  const getNextFocusableIndex = (current: number, step: number): number => {
    let nextIndex = current;

    while (true) {
      nextIndex += step;
      if (nextIndex < 0) {
        nextIndex = items.length - 1;
      } else if (nextIndex >= items.length) {
        nextIndex = 0;
      }

      const item = items[nextIndex];
      if (item.type === "link") {
        return nextIndex;
      }
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex(getNextFocusableIndex(index, 1));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(getNextFocusableIndex(index, -1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (linksRef.current[index]) {
          linksRef.current[index]?.click();
          setActiveIndex(index);
        }
        break;
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return {
    linksRef,
    activeIndex,
    isCurrentPage,
    handleKeyDown,
    handleClick,
  };
};
