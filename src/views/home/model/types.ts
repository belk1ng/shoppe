interface CarouselItem {
  title: string;
  price: number;
  src: string;
}

export interface CarouselItemsResponse {
  data: CarouselItem[];
}
