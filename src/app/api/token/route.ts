import { userService } from "@/entities/user";
import { getJwtToken } from "@/shared/model";

export const GET = async () => {
  try {
    const token = await getJwtToken();

    // NOTE: Token's healthcheck
    await userService.getUserProfile({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    return Response.json({ token });
  } catch {
    return Response.json({
      token: null,
    });
  }
};
