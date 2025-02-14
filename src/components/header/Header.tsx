import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Navigation } from "./navigation";
import "./header.scss";

const block = cn("header");

export function Header() {
  return (
    <header className={block()}>
      <Link aria-label="Go to main page" className={block("logo")} href="/">
        <Image
          alt="Shop logo"
          aria-hidden={true}
          height={27}
          src="/logo.svg"
          width={129}
        />
      </Link>

      <Navigation />
    </header>
  );
}
