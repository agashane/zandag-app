import { Result } from "better-result";
import { findSession } from "./session";
import { createCart, getCart } from "~/features/cart/api";

export const getCartIdFromSession = (request: Request) =>
  Result.gen(async function* () {
    const session = yield* Result.await(findSession(request));
    return Result.ok(session.get("cartId"));
  });

export const setupCart = async (request: Request, currency_code = "cdf") =>
  Result.gen(async function* () {
    const cartId = yield* Result.await(getCartIdFromSession(request));

    if (!cartId) {
      const cart = yield* Result.await(createCart(request));
      return Result.ok(cart);
    }

    const cart = yield* Result.await(getCart(cartId));

    return Result.ok(cart.cart);
  });
