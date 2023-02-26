export default function generateResponse<T>(
  message: string,
  status: number,
  payload?: any
): string {
  const apiResponse: any = {
    message: message,
    code: status,
    payload: payload ? payload : null,
  };
  return apiResponse;
}
