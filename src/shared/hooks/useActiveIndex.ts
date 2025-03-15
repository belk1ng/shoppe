import { useCallback, useState } from "react";

export const useActiveIndex = (totalCount: number, defaultActiveIndex = 0) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const onChangeActiveIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onSetNextIndex = useCallback(() => {
    setActiveIndex((prev) => (prev >= totalCount ? 0 : prev + 1));
  }, [totalCount]);

  const onSetPrevIndex = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
  }, [totalCount]);

  return {
    activeIndex,
    onChangeActiveIndex,
    onSetNextIndex,
    onSetPrevIndex,
  } as const;
};
