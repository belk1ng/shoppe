import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().trim().min(1, "Пароль не должен быть пустым"),
});
