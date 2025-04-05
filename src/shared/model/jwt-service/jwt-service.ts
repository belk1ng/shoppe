"use server";

import { cookies } from "next/headers";

const JWT_TOKEN_KEY = "accessToken";

/**
 * Stores a JWT token in a secure HTTP-only cookie.
 *
 * @param {string} token - The JWT token to store
 * @returns {Promise<void>}
 */
export const storeJwtToken = async (token: string) => {
  const cookie = await cookies();
  cookie.set({
    name: JWT_TOKEN_KEY,
    value: token,
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
};

/**
 * Retrieves the JWT token from cookies.
 *
 * @returns {Promise<string | null>} The JWT token if present, undefined otherwise
 */
export const getJwtToken = async () => {
  const cookie = await cookies();
  return cookie.get(JWT_TOKEN_KEY)?.value ?? null;
};

/**
 * Removes the JWT token from cookies (logout functionality).
 *
 * @returns {Promise<void>}
 */
export const clearJwtToken = async () => {
  const cookie = await cookies();
  cookie.delete(JWT_TOKEN_KEY);
};

/**
 * Gets the JWT token formatted as a Bearer token for Authorization headers.
 * @returns {Promise<string>} The token in "Bearer {token}" format or empty string if no token
 * @example
 * const headers = new Headers({
 *   Authorization: await getBearer()
 * });
 */
export const getBearer = async () => {
  const token = await getJwtToken();
  return token ? `Bearer ${token}` : "";
};
