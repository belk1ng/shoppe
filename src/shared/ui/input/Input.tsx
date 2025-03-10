"use client";

import { type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/shared/lib/cn";
import "./input.scss";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const block = cn("input");

export function Input({
  id,
  className,
  label,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  const _id = useId();

  return (
    <div className={block("", [className])}>
      {startIcon}
      <label className="visuallyHidden" htmlFor={id ?? _id}>
        {label}
      </label>
      <input className={block("field")} id={id ?? _id} {...props} type="text" />
      {endIcon}
    </div>
  );
}
