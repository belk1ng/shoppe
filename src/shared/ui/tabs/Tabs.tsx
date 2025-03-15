"use client";

import { type ReactNode, useCallback, useEffect, useId, useRef } from "react";
import { useActiveIndex, useDebounceCallback } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import "./tabs.scss";

interface Tab {
  title: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  className?: string;
  defaultActiveTab?: number;
}

const block = cn("tabs");

// TODO: Add keyboard navigation
export function Tabs({ className, tabs, defaultActiveTab = 0 }: TabsProps) {
  const { activeIndex, onChangeActiveIndex } = useActiveIndex(
    tabs.length,
    defaultActiveTab
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const activeTabRef = useRef<HTMLButtonElement>(null);

  const indicatorRef = useRef<HTMLLIElement>(null);

  const setIndicatorStyles = useCallback(() => {
    if (activeTabRef.current && indicatorRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTabRef.current.getBoundingClientRect();

      indicatorRef.current.style.width = `${tabRect.width}px`;
      indicatorRef.current.style.left = `${tabRect.left - containerRect.left}px`;
    }
  }, []);

  const debouncedSetIndicatorStyles = useDebounceCallback(
    setIndicatorStyles,
    100
  );

  useEffect(() => {
    window.addEventListener("resize", debouncedSetIndicatorStyles);

    return () => {
      window.removeEventListener("resize", debouncedSetIndicatorStyles);
    };
  }, [debouncedSetIndicatorStyles]);

  useEffect(() => {
    setIndicatorStyles();
  }, [setIndicatorStyles, activeIndex]);

  const prefixId = useId();

  return (
    <div className={block("", className)} ref={containerRef}>
      <ul className={block("list")} role="tablist">
        {tabs.map((tab, index) => (
          <li className={block("listItem")} key={index} role="none">
            <button
              aria-controls={prefixId + index}
              aria-selected={activeIndex === index}
              className={block("tab", { active: activeIndex === index })}
              id={"tab" + prefixId + index}
              onClick={() => onChangeActiveIndex(index)}
              ref={activeIndex === index ? activeTabRef : undefined}
              role="tab"
            >
              {tab.title}
            </button>
          </li>
        ))}

        <li aria-hidden className={block("indicator")} ref={indicatorRef} />
      </ul>

      {tabs.map((tab, index) => (
        <div
          aria-labelledby={"tab" + prefixId + index}
          className={block("panel", { active: activeIndex === index })}
          id={prefixId + index}
          key={index}
          role="tabpanel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
