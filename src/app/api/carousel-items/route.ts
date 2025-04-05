import { MOCKED_CAROUSEL_DATA } from "./mock";

export const GET = async () => {
  return Response.json({
    data: MOCKED_CAROUSEL_DATA,
  });
};
