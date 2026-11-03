import { VStack } from "@chakra-ui/react/stack";
import type { HttpTypes, SellerDTO } from "@mercurjs/types";

import { ProductDetailsHeader } from "./product-details-header";
import { ProductDetailsSeller } from "./product-details-seller";
import { ProductDetailsOffers } from "./product-details-offers";
import type { StoreOffer } from "../utils";

interface Props {
  product: HttpTypes.StoreProduct;
  offers: Array<StoreOffer>;
  seller: SellerDTO;
}

export const ProductDetails = ({ product, offers, seller }: Props) => {
  return (
    <VStack align="stretch" flex="1">
      <ProductDetailsHeader product={product} />
      <ProductDetailsOffers offers={offers} />
      <ProductDetailsSeller seller={seller} />
    </VStack>
  );
};
