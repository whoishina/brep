export type SuccessResponse<T> = {
  success: true;
  data?: T;
};

export type ErrorResponse = {
  success: false;
  error?: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const asSuccess = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const asError = (code: string, message: string): ApiResponse<never> => ({
  success: false,
  error: {
    code,
    message,
  },
});
