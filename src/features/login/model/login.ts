"use server";

import { HttpError } from "@/shared/api";
import { authService } from "@/shared/api/auth";
import { storeJwtToken } from "@/shared/model";
import { LoginSchema } from "./schema";
import { AuthStatus, LoginState } from "./types";

export const loginAction = async (
  _: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = LoginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      status: AuthStatus.VALIDATION_ERROR,
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: rawFormData,
    };
  }

  try {
    const { access_token } = await authService.login(rawFormData);
    await storeJwtToken(access_token, true);

    return {
      status: AuthStatus.SUCCESS,
      fieldValues: {
        email: "",
        password: "",
      },
    };
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.body.statusCode === 401) {
        return {
          status: AuthStatus.INVALID_CREDENTIALS,
          fieldValues: rawFormData,
          errors: {
            email: [error.message],
            password: [error.message],
          },
        };
      }

      return {
        status: AuthStatus.SERVER_ERROR,
        fieldValues: rawFormData,
        errors: {
          email: [error.message],
          password: [error.message],
        },
      };
    }

    return {
      status: AuthStatus.SERVER_ERROR,
      fieldValues: rawFormData,
      errors: {
        email: ["Неизвестная ошибка, попробуйте позже"],
        password: ["Неизвестная ошибка, попробуйте позже"],
      },
    };
  }
};
