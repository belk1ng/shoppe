import type { LoginPayload } from "@/shared/api/auth";

export enum AuthStatus {
  INITIAL = "INITIAL",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  SERVER_ERROR = "SERVER_ERROR",
  SUCCESS = "SUCCESS",
}

export interface LoginState {
  status: AuthStatus;
  errors?: Record<string, string[]>;
  fieldValues: LoginPayload;
}
