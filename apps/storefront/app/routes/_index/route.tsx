import type { Route } from "./+types/route";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import { Container } from "@chakra-ui/react/container";
import { HStack } from "@chakra-ui/react/stack";
import { useStoreContext } from "~/lib/store.context";
import { ProductCard, ProductsScroll } from "~/features/product/components";

export { loader } from "./loader";

export default function Home({ loaderData }: Route.ComponentProps) {
  const { categories } = useStoreContext();
  const { recommendedProducts } = loaderData;

  return (
    <Container>
      <ProductsScroll items={recommendedProducts} />
    </Container>
  );
}
