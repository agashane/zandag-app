import { Container } from "@chakra-ui/react/container";
import type { Route } from "./+types/route";

import { Heading } from "@chakra-ui/react/heading";

import { CollectionNotFound } from "~/features/collection/components";
import { ProductsGrid } from "~/features/product/components";

export { loader } from "./loader";

export default function CollectionRoute({ loaderData }: Route.ComponentProps) {
  const { collection, products } = loaderData;

  if (!collection) return <CollectionNotFound />;

  return (
    <Container spaceY="8">
      <Heading>{collection.title}</Heading>
      <ProductsGrid products={products} />
    </Container>
  );
}
