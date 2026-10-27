import { TaggedError } from "better-result";

export class CollectionNotFound extends TaggedError("CollectionNotFound")<{
  handle: string;
  message: string;
}> {}
