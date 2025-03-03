"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import "./button.scss";

type ButtonVariant = "contained-black" | "outlined-black" | "outlined-white";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  fullWidth?: boolean;
}

const block = cn("button");

export function Button({
  variant,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={block(
        "",
        {
          fullwidth: fullWidth,
          containedBlack: variant === "contained-black",
          outlinedBlack: variant === "outlined-black",
          outlinedWhite: variant === "outlined-white",
        },
        [className]
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
