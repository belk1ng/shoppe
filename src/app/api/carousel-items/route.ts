import { MOCKED_CAROUSEL_DATA } from "@/app/api/carousel-items/mock";

export const GET = async () => {
  return Response.json({
    data: MOCKED_CAROUSEL_DATA,
  });
};
