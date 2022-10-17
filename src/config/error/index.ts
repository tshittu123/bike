import * as http from "http";

export class HttpError extends Error {
  status: number;

  message: string;

  name: "HttpError";

  constructor(status?: number, message?: string) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
    this.name = this.name || "HttpError";
    this.message = message || http.STATUS_CODES[this.status] || "Error";
  }
}

export default HttpError;
