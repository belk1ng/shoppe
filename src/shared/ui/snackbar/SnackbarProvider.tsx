"use client";

import { createSafeContext } from "@/shared/lib";
import { useSnackbar } from "./useSnackbar";

export const [SnackbarProvider, useSnackbarContext] = createSafeContext<
  ReturnType<typeof useSnackbar>
>("SnackbarProvider not found");
