"use server";

import { cookies } from "next/headers";
import type { CartValues } from "./types";
import { CART_KEY } from "../lib/constants";

export const getCartCookie = async () => {
  const cookie = await cookies();

  const cart = cookie.get(CART_KEY)?.value;
  if (cart) {
    return JSON.parse(cart) as CartValues;
  }

  return [];
};

export const updateCartCookie = async (value: CartValues) => {
  const cookie = await cookies();
  cookie.set({
    name: CART_KEY,
    value: JSON.stringify(value),
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
};
