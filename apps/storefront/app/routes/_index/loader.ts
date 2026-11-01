import type { Route } from "./+types/route";

import { Result } from "better-result";
import type { HttpTypes } from "@mercurjs/types";
import {
  getProductsWithOffers,
  type ProductWithOffers,
} from "~/features/product/utils/group-offers";
import { listCollections } from "~/features/collection/api";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const response = await Result.allAsync([
    getProductsWithOffers(request),
    listCollections(),
  ] as const);

  let recommendedProducts: Array<ProductWithOffers> = [];
  let collections: HttpTypes.StoreCollectionListResponse["collections"] = [];

  response.map((res) => {
    const [products, collectionsRes] = res;

    recommendedProducts = products.slice(0, 8);
    collections = collectionsRes.collections ?? [];
  });

  return { recommendedProducts, collections };
};
