import type { ReactNode } from "react";

export type NavigationItem =
  | {
      type: "link";
      path: string;
      label: ReactNode;
      ariaLabel?: string;
    }
  | {
      type: "separator";
    };
