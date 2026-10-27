import type { HttpTypes } from "@mercurjs/types";
import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { CategoryNotFound } from "./errors";

const CATEGORY_FIELDS = "+media_images.*";

export const listCategories = (
  params?: HttpTypes.StoreProductCategoryListParams,
) =>
  Result.tryPromise(async () => {
    const defaultParams = {
      limit: 3,
      fields: CATEGORY_FIELDS,
    } satisfies HttpTypes.StoreProductCategoryListParams;

    const categories = await mercur.store.productCategories.query({
      ...defaultParams,
      ...params,
    });

    return Result.ok(categories as HttpTypes.StoreProductCategoryListResponse);
  });

export const getCategory = (handle: string) =>
  Result.tryPromise({
    try: async () => {
      const result = (await mercur.store.productCategories.query({
        handle,
        fields: CATEGORY_FIELDS,
      })) as HttpTypes.StoreProductCategoryListResponse;

      if (result.count === 0)
        throw new CategoryNotFound({
          handle,
          message: "Category not found",
        });

      return Result.ok(result.product_categories.at(0)!);
    },
    catch: () =>
      new CategoryNotFound({ handle, message: "Category not found" }),
  });
