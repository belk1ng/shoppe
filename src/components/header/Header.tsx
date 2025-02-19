import Image from "next/image";
import { PatchedLink } from "@/components/patched-link";
import { cn } from "@/lib/cn";
import { Navigation } from "./navigation";
import "./header.scss";

const block = cn("header");

export function Header() {
  return (
    <header className={block()}>
      <PatchedLink
        aria-label="Go to main page"
        className={block("logo")}
        href="/"
      >
        <Image
          alt="Shop logo"
          aria-hidden={true}
          height={27}
          src="/logo.svg"
          width={129}
        />
      </PatchedLink>

      <Navigation className={block("navigation")} />
    </header>
  );
}
