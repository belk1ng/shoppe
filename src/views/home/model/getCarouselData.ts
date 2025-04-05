import { internalHttp } from "@/shared/api";
import type { CarouselItemsResponse } from "../model/types";

export const getCarouselData = async () => {
  return internalHttp.get<CarouselItemsResponse>(`/carousel-items`);
};
