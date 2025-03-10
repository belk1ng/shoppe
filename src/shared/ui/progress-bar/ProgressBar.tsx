"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/cn";
import "./progress-bar.scss";
import { ProgressBarProvider } from "./ProgressBarProvider";
import { ProgressState, useProgress } from "./useProgress";

const block = cn("progressBar");

export function ProgressBar({ children }: PropsWithChildren) {
  const progress = useProgress();

  return (
    <ProgressBarProvider value={progress}>
      {progress.state !== ProgressState.Initial && (
        <div
          aria-label="Загрузка контента страницы"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress.value}
          className={block()}
          role="progressbar"
          style={{ width: `${progress.value}%` }}
        />
      )}
      {children}
    </ProgressBarProvider>
  );
}
