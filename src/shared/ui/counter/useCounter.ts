import { useCallback, useEffect, useState } from "react";

export const useCounter = (
  defaultValue: number,
  onChange?: (value: number) => void
) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange?.(value);
    // eslint-disable-next-line
  }, [value]);

  const increment = useCallback(() => {
    setValue((prev) => {
      return prev + 1;
    });
  }, []);

  const decrement = useCallback(() => {
    setValue((prev) => prev - 1);
  }, []);

  return {
    value,
    increment,
    decrement,
  } as const;
};
