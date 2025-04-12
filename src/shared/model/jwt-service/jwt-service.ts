"use server";

import { cookies } from "next/headers";

const JWT_TOKEN_KEY = "accessToken";

/**
 * Stores a JWT token in a secure HTTP-only cookie.
 *
 * @param {string} token - The JWT token to store
 * @param {boolean} rememberMe - If true sets cookie with maxAge (2 weeks).
 *                               If false creates a session cookie that expires when browser closes.
 * @returns {Promise<void>}
 *
 * @example
 * // Persistent cookie (expires in 2 weeks)
 * await storeJwtToken('abc123', true);
 *
 * // Session cookie (expires when browser closes)
 * await storeJwtToken('abc123');
 */
export const storeJwtToken = async (token: string, rememberMe = false) => {
  const cookie = await cookies();
  cookie.set({
    name: JWT_TOKEN_KEY,
    value: token,
    httpOnly: true,
    sameSite: true,
    secure: true,
    ...(rememberMe && {
      maxAge: 60 * 60 * 24 * 14,
    }),
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
