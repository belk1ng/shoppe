"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";
import { createSafeContext } from "@/lib/createSafeContext";
import { ProgressState, useProgress } from "@/lib/hooks/useProgress";
import "./progress-bar.scss";

const [ProgressBarProvider, useProgressBar] = createSafeContext<
  ReturnType<typeof useProgress>
>("ProgressBarProvider not found");

const block = cn("progressBar");

export const ProgressBar = ({ children }: PropsWithChildren) => {
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
};

export { useProgressBar };
