import { mercur } from "~/lib/client";
import type { Route } from "./+types/route";
import { env } from "~/env/server";
import type { OfferDTO, ProductDTO, SellerDTO } from "@mercurjs/types";
import { getProductsWithOffers } from "~/features/product/utils/group-offers";

type GroupedOffer = {
  product: ProductDTO;
  seller: SellerDTO;
  offers: Array<OfferDTO>;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const products = (await getProductsWithOffers(request)).unwrapOr([]);

  const recommendedProducts = products.slice(0, 8);

  return { recommendedProducts };
};
