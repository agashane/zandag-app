import { getCategory } from "~/features/category/api";
import type { Route } from "./+types/route";
import { getProductsByCategory } from "~/features/category/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const category = (await getCategory(params.handle)).unwrapOr(null);
  const products = !category
    ? []
    : (await getProductsByCategory(request, category.id)).unwrapOr([]);
  console.log(products.length);

  return { category, products };
};
