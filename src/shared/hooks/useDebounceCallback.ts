import { useEffect, useMemo, useRef } from "react";

const debounce = <
  Callback extends (...args: Parameters<Callback>) => ReturnType<Callback>,
>(
  func: Callback,
  delay: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<Callback>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const useDebounceCallback = <
  Callback extends (...args: Parameters<Callback>) => ReturnType<Callback>,
>(
  callback: Callback,
  delay: number
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useMemo(() => {
    return debounce(
      (...args: Parameters<Callback>) => callbackRef.current(...args),
      delay
    );
  }, [delay]);
};
