/**
 * Enum containing all possible error codes used throughout the application
 * These codes are used to identify specific types of errors that can occur
 */
export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
}

/**
 * Maps error codes to their corresponding human-readable error messages
 * These messages are used to provide clear feedback to users when errors occur
 */
export const errorMessages = {
  [ErrorCodes.INTERNAL_SERVER_ERROR]: "Internal server error",
  [ErrorCodes.NOT_FOUND]: "Not found",
  [ErrorCodes.BAD_REQUEST]: "Bad request",
  [ErrorCodes.UNAUTHORIZED]: "Unauthorized",
  [ErrorCodes.FORBIDDEN]: "Forbidden",
  [ErrorCodes.CONFLICT]: "Conflict",
  [ErrorCodes.TOO_MANY_REQUESTS]: "Too many requests",
};

/**
 * Array containing all possible error codes
 * Useful for validation and type checking
 */
export const errorCodes = Object.values(ErrorCodes);
