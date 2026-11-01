import type { Route } from "./+types/route";
import { Container } from "@chakra-ui/react/container";
import { useStoreContext } from "~/lib/store.context";
import { ProductsScroll } from "~/features/product/components";
import { CategoriesScroll } from "~/features/category/components";
import { DefaultSection } from "~/features/shared/components";
import { createPath } from "react-router";
import { CollectionsBento } from "~/features/collection/components";

export { loader } from "./loader";

export default function Home({ loaderData }: Route.ComponentProps) {
  const { categories } = useStoreContext();
  const { recommendedProducts, collections } = loaderData;

  return (
    <Container spaceY="8">
      <DefaultSection
        heading="Shop by categories"
        more_link={createPath({ pathname: "/categories" })}
      >
        <CategoriesScroll categories={categories} />
      </DefaultSection>

      <DefaultSection heading="Produits récents">
        <ProductsScroll items={recommendedProducts} />
      </DefaultSection>

      <DefaultSection
        heading="Shop by collection"
        more_link={createPath({ pathname: "/collections" })}
      >
        <CollectionsBento collections={collections} />
      </DefaultSection>

      <DefaultSection heading="Moins de 5$">
        <ProductsScroll items={recommendedProducts} />
      </DefaultSection>
    </Container>
  );
}
