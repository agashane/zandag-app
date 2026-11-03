import { TaggedError } from "better-result";

export class SellerNotFound extends TaggedError("SellerNotFound")<{}> {}
