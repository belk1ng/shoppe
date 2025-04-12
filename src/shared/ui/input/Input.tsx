"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from "react";
import { ClosedEye, OpenedEye } from "@/shared/assets";
import { cn } from "@/shared/lib/cn";
import "./input.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  type = "text",
  ...props
}: InputProps) {
  const _id = useId();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onTogglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const isPassword = type === "password";

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
          type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
          {...props}
        />
        {isPassword ? (
          <button
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            className={block("passwordAction")}
            onClick={onTogglePasswordVisibility}
            type="button"
          >
            {isPasswordVisible ? <ClosedEye /> : <OpenedEye />}
          </button>
        ) : (
          endIcon
        )}
      </div>

      {errorMessage && (
        <p aria-live="assertive" className={block("error")} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
