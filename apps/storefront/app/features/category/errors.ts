import { TaggedError } from "better-result";

export class CategoryNotFound extends TaggedError("CategoryNotFound")<{
  handle: string;
  message: string;
}> {}
