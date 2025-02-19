"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  startTransition,
  type MouseEvent,
  type PropsWithChildren,
  type HTMLAttributes,
} from "react";
import { useProgressBar } from "@/components/progress-bar";

export const PatchedLink = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<LinkProps & HTMLAttributes<HTMLAnchorElement>>
>(({ href, onClick: onClick, ...props }, ref) => {
  const router = useRouter();
  const progress = useProgressBar();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    progress.start();

    startTransition(() => {
      router.push(href as string);
      progress.done();
      onClick?.(event);
    });
  };

  return <Link href={href} onClick={handleClick} ref={ref} {...props} />;
});

PatchedLink.displayName = "PatchedLink";
