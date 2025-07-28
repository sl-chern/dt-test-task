import { httpCodes } from "../http-codes";

export type FetchJsonResponse<T> =
  | { status: typeof httpCodes.OK | typeof httpCodes.CREATED; data: T }
  | { status: typeof httpCodes.NO_CONTENT; data: undefined }
  | {
      status:
        | typeof httpCodes.INTERNAL_SERVER_ERROR
        | typeof httpCodes.SERVICE_UNAVAILABLE;
      data: undefined;
    };
