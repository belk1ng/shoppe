"use client";

import { cn } from "@/shared/lib";
import { useCounter } from "./useCounter";
import "./counter.scss";

export interface CounterProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const block = cn("counter");

export function Counter({
  className,
  defaultValue = 0,
  min = 0,
  max = Infinity,
  onChange,
}: CounterProps) {
  const { value, increment, decrement } = useCounter(defaultValue, onChange);

  return (
    <div className={block("", [className])}>
      <button
        aria-label="Уменьшить количество"
        className={block("action")}
        disabled={value <= min}
        onClick={decrement}
      >
        -
      </button>
      <output aria-live="polite">
        <span className="visuallyHidden">Текущее количество:</span>
        {value}
      </output>
      <button
        aria-label="Увеличить количество"
        className={block("action")}
        disabled={value >= max}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
