import { TaggedError } from "better-result";

export class ProductNotFound extends TaggedError("ProductNotFound")<{
  handle: string;
  message: string;
}> {}

export class HttpResponseError extends TaggedError("HttpResponseError")<{
  status: number;
  url: string;
  message: string;
}> {}
