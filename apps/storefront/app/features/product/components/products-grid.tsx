import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import type { HttpTypes } from "@mercurjs/types";
import { SimpleProduct } from "./simple-product";
import { ProductCard } from "./product-card";
import type { ProductWithOffers } from "../utils/group-offers";

interface Props {
  products: Array<ProductWithOffers>;
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <SimpleGrid columns={{ smDown: 2, md: 4, lg: 6 }} gap="4">
      {products.map((item) => (
        <ProductCard key={item.product.id} item={item} />
      ))}
    </SimpleGrid>
  );
};
