import type { SellerDTO } from "@mercurjs/types";
import { Result } from "better-result";
import { mercur } from "~/lib/client";

export const getSellers = () =>
  Result.tryPromise({
    try: () =>
      mercur.store.sellers.query({
        offset: 0,
        limit: 20,
        order: "-updated_at",
      }),
    catch: () => ({
      limit: 0,
      count: 0,
      offset: 0,
      sellers: [] as Array<SellerDTO>,
    }),
  });

export const retrieveSeller = (handle: string) =>
  Result.tryPromise({
    try: async () => {
      const sellers = await mercur.store.sellers.query({
        handle,
        offset: 0,
        limit: 1,
        order: "-updated_at",
      });

      if (sellers.count === 0) throw null;

      return sellers.sellers.at(0)!;
    },
    catch: () => null,
  });
