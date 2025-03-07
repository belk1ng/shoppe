import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import type { RatingProps } from "./Rating";

type UseRatingOptions = Required<
  Pick<RatingProps, "totalRating" | "defaultValue" | "disabled">
>;

export const useRating = ({
  defaultValue,
  disabled,
  totalRating,
}: UseRatingOptions) => {
  const [rating, setRating] = useState(defaultValue);

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const ratingRefs = useRef<Array<HTMLLabelElement | null>>([]);

  const onChangeRating = useCallback((index: Nullable<number>) => {
    setRating(index);
  }, []);

  const onChangeHoverRating = useCallback((index: Nullable<number>) => {
    setHoverRating(index);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLLabelElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = (index + 1) % totalRating;
        ratingRefs.current[nextIndex]?.focus();
        setRating(nextIndex + 1);
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = (index - 1 + totalRating) % totalRating;
        ratingRefs.current[prevIndex]?.focus();
        setRating(prevIndex + 1);
        break;
      }
      case "Home": {
        event.preventDefault();
        ratingRefs.current[0]?.focus();
        setRating(1);
        break;
      }
      case "End": {
        event.preventDefault();
        ratingRefs.current[totalRating - 1]?.focus();
        setRating(totalRating);
        break;
      }
      case " ": {
        event.preventDefault();
        setRating(index + 1);
        break;
      }
      default:
        break;
    }
  };

  return {
    rating,
    hoverRating,
    ratingRefs,
    onChangeRating: disabled ? undefined : onChangeRating,
    onKeyDown: disabled ? undefined : onKeyDown,
    onChangeHoverRating: disabled ? undefined : onChangeHoverRating,
  } as const;
};
