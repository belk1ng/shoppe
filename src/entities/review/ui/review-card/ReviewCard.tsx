import { cn } from "@/shared/lib";
import type { Review } from "../../model/types";
import { Rating } from "../rating";
import "./review-card.scss";

export interface ReviewCardProps {
  review: Review;
  className?: string;
  heading?: Heading;
}

const block = cn("reviewCard");

export function ReviewCard({ review, className, heading }: ReviewCardProps) {
  const Heading = heading ?? "h3";

  const date = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(review.date));

  return (
    <article className={block("", [className])}>
      <header className={block("header")}>
        <Heading className={block("title")}>{review.name}</Heading>
        <span className={block("date")}>{date}</span>
      </header>
      <Rating className={block("rating")} disabled value={review.rating} />
      <footer className={block("footer")}>
        <p className={block("description")}>{review.description}</p>
      </footer>
    </article>
  );
}
