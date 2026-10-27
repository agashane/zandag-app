import type { OfferDTO, ProductDTO, SellerDTO } from "@mercurjs/types";
import { Result } from "better-result";
import { listOffers } from "../api";

export type ProductWithOffers = {
  product: ProductDTO;
  seller: SellerDTO;
  offers?: Array<OfferDTO>;
};

export const groupOffers = (offers: Array<OfferDTO>) => {
  const grouped = new Map<string, ProductWithOffers>();
  for (const offer of offers) {
    const key = `${offer.seller?.id}-${offer.product?.id}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.offers?.push(offer);
    } else {
      grouped.set(key, {
        product: offer.product!,
        seller: offer.seller!,
        offers: [offer],
      });
    }
  }

  return [...grouped.values()];
};

export const getProductsWithOffers = (request: Request) =>
  Result.gen(async function* () {
    const offers = yield* Result.await(listOffers(request));
    const products = groupOffers(offers.offers ?? []);

    // TODO: Implement limit, sort and filtering

    return Result.ok(products);
  });
