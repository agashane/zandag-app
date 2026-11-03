import type { Route } from "./+types/route";

import { Container } from "@chakra-ui/react/container";

import { ProductDetails, ProductImages } from "~/features/product/components";

export { loader } from "./loader";
export { ErrorBoundary } from "./error";

export default function ShowProductRoute({ loaderData }: Route.ComponentProps) {
  const { product, seller, offers } = loaderData;

  return (
    <Container display="flex" flexDir={{ smDown: "column", sm: "row" }} gap="4">
      <ProductImages product={product} />
      <ProductDetails product={product} offers={offers} seller={seller} />
    </Container>
  );
}
