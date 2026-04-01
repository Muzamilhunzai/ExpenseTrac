export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};
