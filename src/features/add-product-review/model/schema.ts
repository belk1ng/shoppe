import { z } from "zod";

export const ReviewSchema = z.object({
  review: z.string().trim().min(1, { message: "Поле обязательное" }),
  name: z.string().trim().min(1, { message: "Поле обязательное" }),
  email: z.string().email({ message: "Неправильный email адрес" }),
  rating: z.number().min(1, { message: "Поле обязательное" }),
});
