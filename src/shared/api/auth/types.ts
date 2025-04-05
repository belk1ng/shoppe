export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface RestorePayload {
  email: string;
}

export interface RestoreResponse {
  message: string;
}
