import type { HttpTypes } from "@mercurjs/types";
import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { CategoryNotFound } from "./errors";
import type {
  ProductCategoriesListResponse,
  ProductCategoryWithImage,
} from "./types";

const CATEGORY_FIELDS = "*media_images";

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

    return categories as ProductCategoriesListResponse;
  });

export const getCategory = (handle: string) =>
  Result.tryPromise({
    try: async () => {
      const result = (await mercur.store.productCategories.query({
        handle,
        fields: CATEGORY_FIELDS,
      })) as HttpTypes.StoreProductCategoryListResponse;

      if (result.count === 0) throw null;

      const category = result.product_categories.at(
        0,
      )! as ProductCategoryWithImage;
      return category;
    },
    catch: () => null,
  });
