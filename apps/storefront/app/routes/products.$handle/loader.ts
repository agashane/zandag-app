import { data } from "react-router";
import type { Route } from "./+types/route";
import { Result } from "better-result";
import { listProductOffers, retrieveProduct } from "~/features/product/api";
import { retrieveSeller } from "~/features/seller/api";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const sellerParam = url.searchParams.get("seller");

  if (!sellerParam) {
    throw data("Seller not found", { status: 404 });
  }

  const results = (
    await Result.allAsync([
      retrieveProduct(params.handle),
      retrieveSeller(sellerParam),
    ])
  ).unwrapOr(null);

  if (!results) {
    throw data("No product", { status: 404 });
  }

  const [product, seller] = results;
  const offers = (
    await listProductOffers(request, product.id, seller.id)
  ).unwrap();

  return { product, seller, offers: offers.offers };
};
