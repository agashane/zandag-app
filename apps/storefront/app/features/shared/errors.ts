import { TaggedError } from "better-result";

export class RegionNotFound extends TaggedError("RegionNotFound")<{
  id: string;
  message: string;
}> {}
