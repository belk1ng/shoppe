import { cn } from "../../../lib/cn";

export interface CarouselProps {
  className?: string;
}

const block = cn("carousel");

export function Carousel({ className }: CarouselProps) {
  return <div className={block("", [className])}>Content here</div>;
}
