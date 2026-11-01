import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import type { HttpTypes } from "@mercurjs/types";
import { SimpleProduct } from "./simple-product";

interface Props {
  products: Array<HttpTypes.StoreProduct>;
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <SimpleGrid columns={{ smDown: 2, md: 4, lg: 6 }} gap="4">
      {products.map((product) => (
        <SimpleProduct key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
