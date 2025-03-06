"use client";

import { createSafeContext } from "@/shared/lib/createSafeContext";
import { useProgress } from "./useProgress";

export const [ProgressBarProvider, useProgressBar] = createSafeContext<
  ReturnType<typeof useProgress>
>("ProgressBarProvider not found");
