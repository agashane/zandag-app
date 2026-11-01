import { Result } from "better-result";
import { getProductsWithOffers } from "~/features/product/utils/group-offers";

export const getProductsByCategory = (request: Request, id: string) =>
  Result.gen(async function* () {
    const products = yield* Result.await(getProductsWithOffers(request));
    const filteredProducts = products.filter((item) => {
      const categories = item.product.categories?.map(
        (category) => category.id,
      );

      console.log(`Categories ${categories?.length}`);

      return categories?.includes(id);
    });

    return Result.ok(filteredProducts);
  });
