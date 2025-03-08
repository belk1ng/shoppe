import type { HTMLAttributes } from "react";

export function ChevronRight(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.293 1.293a1 1 0 0 0 0 1.414L16.586 12l-9.293 9.293a1 1 0 1 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 0 0-1.414 0"
        fill="currentColor"
      />
    </svg>
  );
}
