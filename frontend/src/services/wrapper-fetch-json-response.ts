import { httpCodes } from "./http-codes";
import { FetchJsonResponse } from "./types/fetch-json-response";

async function wrapperFetchJsonResponse<T>(
  response: Response,
): Promise<FetchJsonResponse<T>> {
  const status = response.status as FetchJsonResponse<T>["status"];
  return {
    status,
    data: [
      httpCodes.NO_CONTENT,
      httpCodes.SERVICE_UNAVAILABLE,
      httpCodes.INTERNAL_SERVER_ERROR,
    ].includes(status)
      ? undefined
      : await response.json(),
  };
}

export default wrapperFetchJsonResponse;
