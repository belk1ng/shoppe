"use client";

import type { ComponentPropsWithRef } from "react";
import { cn } from "@/shared/lib/cn";
import "./button.scss";

type ButtonVariant = "contained-black" | "outlined-black" | "outlined-white";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
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
