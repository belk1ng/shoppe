"use client";

import type { HTMLAttributes } from "react";
import { Star } from "@/shared/assets";
import { cn, getRussianPluralForm } from "@/shared/lib";
import { useRating } from "./useRating";
import "./rating.scss";

export interface RatingProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "defaultChecked" | "onChange"
  > {
  name?: string;
  totalRating?: number;
  value?: Nullable<number>;
  disabled?: boolean;
  errorMessage?: string;
}

const block = cn("rating");

export function Rating({
  totalRating = 5,
  className,
  name,
  disabled = false,
  value,
  errorMessage,
  ...props
}: RatingProps) {
  const {
    rating,
    onChangeRating,
    hoverRating,
    ratingRefs,
    onChangeHoverRating,
    onKeyDown,
  } = useRating({
    value: value || null,
    disabled,
    totalRating,
  });

  return (
    <div {...props} className={block("", [className])}>
      <div className={block("wrapper")} role="radiogroup">
        {Array.from({ length: totalRating }, () => null).map((_, index) => (
          <button
            aria-checked={rating === index + 1}
            aria-label={getRussianPluralForm(index + 1, [
              "звезда",
              "звезды",
              "звезд",
            ])}
            className={block("button", {
              active: index + 1 <= (hoverRating || rating || 0),
              disabled,
            })}
            key={index}
            onClick={() => onChangeRating?.(index + 1)}
            onKeyDown={(e) => onKeyDown?.(e, index)}
            onMouseEnter={() => onChangeHoverRating?.(index + 1)}
            onMouseLeave={() => onChangeHoverRating?.(null)}
            ref={(el) => {
              ratingRefs.current[index] = el;
            }}
            role="radio"
            tabIndex={(rating ?? 1) === index + 1 && !disabled ? 0 : -1}
            type="button"
          >
            {name && (
              <input
                checked={rating === index + 1}
                hidden
                name={name}
                readOnly
                type="radio"
                value={index + 1}
              />
            )}
            <Star
              className={block("star", {
                error: !!errorMessage,
              })}
            />
          </button>
        ))}
      </div>

      {errorMessage && (
        <p aria-live="assertive" className={block("error")} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
