"use client";

import type { PropsWithChildren } from "react";
import { Check } from "@/shared/assets";
import { cn } from "@/shared/lib";
import { SnackbarProvider } from "./SnackbarProvider";
import { useSnackbar } from "./useSnackbar";
import "./snackbar.scss";

export interface SnackbarProps {
  autoHideDuration?: number;
}

const block = cn("snackbar");

export function Snackbar({
  autoHideDuration = 5_000,
  children,
}: PropsWithChildren<SnackbarProps>) {
  const value = useSnackbar(autoHideDuration);

  const { isOpen, message, snackbarType } = value;

  return (
    <SnackbarProvider value={value}>
      {isOpen && (
        <div
          aria-atomic="true"
          aria-label="Уведомление"
          aria-live={snackbarType === "success" ? "polite" : "assertive"}
          className={block({ open: isOpen })}
          role={snackbarType === "success" ? "status" : "alert"}
        >
          {snackbarType === "success" && <Check aria-hidden />}
          <span className={block("message")}>{message}</span>
        </div>
      )}
      {children}
    </SnackbarProvider>
  );
}
