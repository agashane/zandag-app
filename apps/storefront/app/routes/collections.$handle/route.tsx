import type { Route } from "./+types/route";

import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react/heading";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";

import { CollectionNotFound } from "~/features/collection/components";
import { ProductsGrid } from "~/features/product/components";

export { loader } from "./loader";

export default function CollectionRoute({ loaderData }: Route.ComponentProps) {
  const { collection } = loaderData;

  if (!collection) return <CollectionNotFound />;

  return (
    <Box>
      <Heading>{collection.title}</Heading>
      <ProductsGrid products={collection.products ?? []} />
    </Box>
  );
}
