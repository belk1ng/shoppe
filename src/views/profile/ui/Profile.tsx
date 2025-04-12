import { userService } from "@/entities/user";
import { getBearer } from "@/shared/model";

export async function Profile() {
  const profile = await userService.getUserProfile({
    headers: {
      Authorization: await getBearer(),
    },
    cache: "no-cache",
  });

  return (
    <main>
      <h1>Профиль</h1>
      {JSON.stringify(profile, null, 2)}
    </main>
  );
}
