import { TaggedError } from "better-result";

export class CartNotFound extends TaggedError("CartNotFound")<{
  id: string;
  message: string;
}> {}

export class CartCreationError extends TaggedError("CartCreationError")<{
  message: string;
}> {}
