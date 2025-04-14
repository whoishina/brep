export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const ErrorCodes = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_REGION_NOT_FOUND: "USER_REGION_NOT_FOUND",
  INVALID_REQUEST: "INVALID_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
