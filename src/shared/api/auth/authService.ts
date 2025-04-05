import { http, HttpClient } from "../http";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RestorePayload,
} from "./types";

/**
 * Service for handling authentication-related operations.
 * Provides methods for user login, registration, and password restoration.
 */
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @constructor
   * @param {HttpClient} client - The HTTP client instance used for making requests
   */
  constructor(private readonly client: HttpClient) {}

  /**
   * Authenticates a user with provided credentials.
   *
   * @param {LoginPayload} body - The login credentials including email and password
   * @returns {Promise<AuthResponse>} A promise that resolves with authentication data (token, user info)
   */
  public async login(body: LoginPayload) {
    return this.client.post<AuthResponse, LoginPayload>("/auth/login", {
      body,
    });
  }

  /**
   * Registers a new user account.
   *
   * @param {RegisterPayload} body - The registration data including user details
   * @returns {Promise<AuthResponse>} A promise that resolves with authentication data
   */
  public async register(body: RegisterPayload) {
    return this.client.post<AuthResponse, RegisterPayload>("/auth/register", {
      body,
    });
  }

  /**
   * Initiates password restoration process for a user.
   *
   * @param {RestorePayload} body - The payload containing email for password restoration
   * @returns {Promise<AuthResponse>} A promise that resolves with operation status
   */
  public async restorePassword(body: RestorePayload) {
    return this.client.post<AuthResponse, RestorePayload>("/auth/restore", {
      body,
    });
  }
}

export const authService = new AuthService(http);
