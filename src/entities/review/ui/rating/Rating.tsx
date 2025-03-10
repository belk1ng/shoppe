"use client";

import type { HTMLAttributes } from "react";
import { Star } from "@/shared/assets";
import { cn, getRussianPluralForm } from "@/shared/lib";
import { useRating } from "./useRating";
import "./rating.scss";

export interface RatingProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "defaultChecked"
  > {
  name: string;
  totalRating?: number;
  defaultValue?: Nullable<number>;
  disabled?: boolean;
}

const block = cn("rating");

export function Rating({
  totalRating = 5,
  className,
  name,
  disabled = false,
  defaultValue = null,
  ...props
}: RatingProps) {
  const {
    rating,
    hoverRating,
    ratingRefs,
    onChangeRating,
    onChangeHoverRating,
    onKeyDown,
  } = useRating({ defaultValue, disabled, totalRating });

  return (
    <div {...props} className={block("", [className])} role="radiogroup">
      {Array.from({ length: totalRating }, () => null).map((_, index) => (
        <label
          aria-checked={rating === index + 1}
          aria-label={getRussianPluralForm(index + 1, [
            "звезда",
            "звезды",
            "звезд",
          ])}
          className={block("label", {
            active: index + 1 <= (hoverRating || rating || 0),
            disabled,
          })}
          key={index}
          onKeyDown={(e) => onKeyDown?.(e, index)}
          onMouseEnter={() => onChangeHoverRating?.(index + 1)}
          onMouseLeave={() => onChangeHoverRating?.(null)}
          ref={(el) => {
            ratingRefs.current.push(el);
          }}
          role="radio"
          tabIndex={(rating ?? 1) === index + 1 ? 0 : -1}
        >
          <input
            className={block("field")}
            hidden
            name={name}
            onChange={() => onChangeRating?.(index + 1)}
            type="radio"
            value={index + 1}
          />
          <Star className={block("star")} />
        </label>
      ))}
    </div>
  );
}
