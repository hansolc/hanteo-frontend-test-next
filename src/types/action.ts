export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  error: string;
}

export type ActionResult<T> = SuccessResponse<T> | ErrorResponse;
