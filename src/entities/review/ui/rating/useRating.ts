import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { RatingProps } from "./Rating";

type UseRatingOptions = Required<
  Pick<RatingProps, "totalRating" | "value" | "disabled">
>;

export const useRating = ({
  value,
  disabled,
  totalRating,
}: UseRatingOptions) => {
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const ratingRefs = useRef<Array<HTMLButtonElement | null>>(
    new Array(totalRating).fill(null)
  );

  const onChangeRating = useCallback((index: Nullable<number>) => {
    setRating(index);
  }, []);

  const onChangeHoverRating = useCallback((index: Nullable<number>) => {
    setHoverRating(index);
  }, []);

  useEffect(() => {
    onChangeRating(value);
  }, [value, onChangeRating]);

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
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
