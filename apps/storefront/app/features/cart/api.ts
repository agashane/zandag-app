import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { CartCreationError, CartNotFound } from "./errors";
import { getRegionFromSession } from "~/server/region";

export const getCart = (id: string) =>
  Result.tryPromise({
    try: () => mercur.store.carts.$id.query({ $id: id }),
    catch: () => new CartNotFound({ id, message: "Cart not found" }),
  });

export const createCart = (request: Request, currency_code = "cdf") =>
  Result.gen(async function* () {
    const region_id = yield* Result.await(getRegionFromSession(request));

    return (
      await Result.tryPromise({
        try: () =>
          mercur.store.carts.mutate({
            region_id: region_id.unwrap(),
            currency_code,
          }),
        catch: () =>
          new CartCreationError({ message: "Impossible to create cart" }),
      })
    ).andThen((cart) => Result.ok(cart.cart));
  });
