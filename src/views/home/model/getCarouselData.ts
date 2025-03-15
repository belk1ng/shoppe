import { headers } from "next/headers";
import type { CarouselItemsResponse } from "../model/types";

export const getCarouselData = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("x-forwarded-host");

  const response = await fetch(`${protocol}://${host}/api/carousel-items`);

  return (await response.json()) as CarouselItemsResponse;
};
