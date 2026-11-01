import {
  getCollection,
  getProductsByCollection,
} from "~/features/collection/api";
import type { Route } from "./+types/route";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const collection = (await getCollection(params.handle)).unwrapOr(null);
  const products = !collection
    ? []
    : (await getProductsByCollection(request, collection.id)).unwrapOr([]);

  return { collection, products };
};
