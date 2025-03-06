"use client";

import { type Dispatch } from "react";
import { cn } from "@/shared/lib/cn";
import "./pagination.scss";

export interface PaginationProps {
  className?: string;
  onChange?: Dispatch<{ limit: number; offset: number }>;
  totalCount: number;
  limit: number;
  offset: number;
}

const block = cn("pagination");

const EACH_SIDE_PAGES_SHOWN = 2;

export function Pagination({
  className,
  onChange,
  totalCount,
  limit,
  offset,
}: PaginationProps) {
  const pagesCount = Math.ceil(totalCount / limit);

  const currentPage = offset === 0 ? 0 : offset / limit;

  const handleButtonClick = (page: number) => {
    const updatedOffset = limit * page;
    if (updatedOffset !== offset) {
      onChange?.({
        offset: updatedOffset,
        limit: limit,
      });
    }
  };

  return (
    <nav aria-label="Пагинация" className={block("", [className])}>
      <ul className={block("list")}>
        <li className={block("item")}>
          <button
            aria-label="Перейти к первой странице"
            className={block("button")}
            disabled={currentPage === 0}
            onClick={() => handleButtonClick(0)}
            type="button"
          >
            {`<`}
          </button>
        </li>

        {Array.from({ length: pagesCount }, (_, index) => index)
          .slice(
            currentPage - EACH_SIDE_PAGES_SHOWN < 0
              ? 0
              : currentPage - EACH_SIDE_PAGES_SHOWN,
            currentPage + EACH_SIDE_PAGES_SHOWN + 1
          )
          .map((page) => (
            <li className={block("item")} key={page}>
              <button
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Страница ${page + 1}`}
                className={block("button", { active: currentPage === page })}
                onClick={() => handleButtonClick(page)}
                type="button"
              >
                {page + 1}
              </button>
            </li>
          ))}

        <li className={block("item")}>
          <button
            aria-label="Перейти к последней странице"
            className={block("button")}
            disabled={currentPage === pagesCount - 1}
            onClick={() => handleButtonClick(pagesCount - 1)}
            type="button"
          >
            {`>`}
          </button>
        </li>
      </ul>
    </nav>
  );
}
