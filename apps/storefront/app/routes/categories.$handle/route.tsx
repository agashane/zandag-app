import type { Route } from "./+types/route";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";

import { CategoryNotFound } from "~/features/category/components";
import { ProductsGrid } from "~/features/product/components";

export { loader } from "./loader";

export default function CategoryRoute({ loaderData }: Route.ComponentProps) {
  const { category, products } = loaderData;

  if (!category) return <CategoryNotFound />;

  return (
    <Container spaceY="8">
      <Heading>{category.name}</Heading>
      <ProductsGrid products={products} />
    </Container>
  );
}
