/**
 * Represents the structure of an HTTP error response body.
 *
 * @typedef {Object} HttpErrorBody
 * @property {string|string[]} message - The error message(s), which can be a single string or an array of strings.
 * @property {string} error - The type/name of the error (e.g., "Bad Request").
 * @property {number} statusCode - The HTTP status code of the error response.
 */
export interface HttpErrorBody {
  message: string | string[];
  error?: string;
  statusCode: number;
}

/**
 * Capitalizes the first letter of a string.
 *
 * @private
 * @param {string} value - The string to capitalize.
 * @returns {string} The capitalized string.
 */
const capitalizeErrorMessage = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export class HttpError extends Error {
  /**
   * The complete error response body.
   *
   * @type {HttpErrorBody}
   * @public
   */
  public body: HttpErrorBody;

  /**
   * Creates an instance of HttpError.
   *
   * @constructor
   * @param {HttpErrorBody} error - The error response body.
   */
  constructor(error: HttpErrorBody) {
    super(
      typeof error.message === "string"
        ? capitalizeErrorMessage(error.message)
        : error.message.map(capitalizeErrorMessage).join(". ")
    );

    this.body = error;

    // Ensure proper prototype chain for Error inheritance
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
