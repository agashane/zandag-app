import { getCollection } from "~/features/collection/api";
import type { Route } from "./+types/route";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const collection = (await getCollection(params.handle)).unwrapOr(null);

  return { collection };
};
