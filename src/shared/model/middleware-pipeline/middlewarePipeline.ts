import { NextMiddleware, NextResponse } from "next/server";

/**
 * A function type that composes Next.js middleware.
 * Takes a NextMiddleware function and returns a new enhanced middleware function.
 *
 * @callback MiddlewareFactory
 * @param {NextMiddleware} middleware - The next middleware in the chain
 * @returns {NextMiddleware} Enhanced middleware function
 */
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Creates a middleware pipeline by composing multiple middleware factories.
 * Executes middleware functions in sequence, allowing each to process the request
 * before passing it to the next middleware in the chain.
 *
 * @param {MiddlewareFactory[]} [functions=[]] - Array of middleware factory functions
 * @param {number} [index=0] - Current index in the middleware chain (used for recursion)
 * @returns {NextMiddleware} Composed middleware function
 * @example
 * const middleware = middlewarePipeline([
 *   withAuth,
 *   withLogging,
 *   withFeatureFlags
 * ]);
 */
export const middlewarePipeline = (
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware => {
  const current = functions[index];

  if (current) {
    const next = middlewarePipeline(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
};
