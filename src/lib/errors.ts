export class ApiError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 500, code = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof DOMException && error.name === 'AbortError') return 'The request timed out. Please try again.';
  if (error instanceof ApiError) return error.message;
  if (error instanceof TypeError) return 'We could not reach the study service. Check your connection and try again.';
  if (error instanceof Error) return error.message;
  return 'Something went wrong while generating the study set.';
}