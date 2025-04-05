import { type BaseSimpleRequestOptions, http, HttpClient } from "@/shared/api";
import type { UserProfileResponse } from "./types";

/**
 * Service for handling user-related operations and data fetching.
 * Provides methods to interact with user-specific API endpoints.
 */
export class UserService {
  /**
   * Creates an instance of UserService.
   *
   * @constructor
   * @param {HttpClient} client - The HTTP client instance used for making requests
   */
  constructor(private readonly client: HttpClient) {}

  /**
   * Retrieves the profile information of the authenticated user.
   *
   * @param {BaseSimpleRequestOptions} options - Request configuration options including headers
   * @returns {Promise<UserProfileResponse>} A promise that resolves with the user profile data
   */
  public async getUserProfile(options: BaseSimpleRequestOptions) {
    return this.client.get<UserProfileResponse>("/user/profile", options);
  }
}

export const userService = new UserService(http);
