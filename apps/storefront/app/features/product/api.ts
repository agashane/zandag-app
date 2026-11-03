import type { HttpTypes } from "@mercurjs/types";
import { Result } from "better-result";
import { mercur } from "~/lib/client";
import { getRegionData } from "../shared/region";
import type { OffersListResponse } from "./types";

// const OFFERS_FIELDS =
// "id,selled_id,variant_id,product_id,sku,created_at,updated_at,seller.id,seller.name,seller.handle,*product_variant,product.id,product.title,product.handle,product.thumbnail,product.created_at,product.updated_at,*inventory_item_link,+calculated_price";
const OFFERS_FIELDS = "*seller,*product,*product.categories";

export const listOffers = (request: Request) =>
  Result.gen(async function* () {
    const region = yield* Result.await(getRegionData(request));
    const offers = await Result.tryPromise(async () => {
      return (await mercur.store.offers.query({
        limit: 1000,
        order: "-updated_at",
        offset: 0,
        region_id: region.id,
        fields: OFFERS_FIELDS,
      })) as HttpTypes.VendorOfferListResponse;
    });

    return offers;
  });

export const listProducts = (params?: HttpTypes.StoreProductListParams) =>
  Result.tryPromise(() => mercur.store.products.query({}));

export const retrieveProduct = (handle: string) =>
  Result.tryPromise({
    try: async () => {
      const products = (await mercur.store.products.query({
        handle,
      })) as HttpTypes.StoreProductListResponse;

      if (products.count === 0) throw null;

      return products.products.at(0)!;
    },
    catch: () => null,
  });

export const listProductOffers = (
  request: Request,
  product: string,
  seller: string,
) =>
  Result.gen(async function* () {
    const region = yield* Result.await(getRegionData(request));
    const offers = await Result.tryPromise(async () => {
      return (await mercur.store.offers.query({
        seller_id: seller,
        product_id: product,
        limit: 20,
        order: "-updated_at",
        offset: 0,
        region_id: region.id,
        fields: OFFERS_FIELDS,
      })) as HttpTypes.VendorOfferListResponse;
    });

    return offers;
  });
