import type { HttpTypes } from "@mercurjs/types";
import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { CollectionNotFound } from "./errors";

const COLLECTION_FIELDS = "+media_images.*";

export const listCollections = (params?: HttpTypes.StoreCollectionListParams) =>
  Result.tryPromise(async () => {
    const defaultParams = {
      limit: 3,
      fields: COLLECTION_FIELDS,
      order: "-updated_at",
    } satisfies HttpTypes.StoreCollectionListParams;

    const collections = await mercur.store.collections.query({
      ...defaultParams,
      ...params,
    });
    return collections;
  });

export const getCollection = (handle: string) =>
  Result.tryPromise({
    try: async () => {
      const result = await mercur.store.collections.query({
        handle,
        fields: "*media_images,*products",
      });

      if (result.count === 0) throw null;

      return result.collections.at(0)!;
    },
    catch: () => null,
  });
