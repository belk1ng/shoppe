"use client";

import { type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/shared/lib/cn";
import "./input.scss";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  errorMessage?: string;
}

const block = cn("input");

export function Input({
  id,
  className,
  label,
  startIcon,
  endIcon,
  errorMessage,
  ...props
}: InputProps) {
  const _id = useId();

  return (
    <div className={block("", [className])}>
      <div className={block("wrapper", { error: !!errorMessage })}>
        {startIcon}
        <label className="visuallyHidden" htmlFor={id ?? _id}>
          {label}
        </label>
        <input
          aria-invalid={Boolean(errorMessage)}
          className={block("field")}
          id={id ?? _id}
          {...props}
          type="text"
        />
        {endIcon}
      </div>

      {errorMessage && (
        <p aria-live="assertive" className={block("error")} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
