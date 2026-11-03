import type { HttpTypes, SellerDTO } from "@mercurjs/types";
import {
  getProductPrice,
  getProductWithOfferPrice,
  type StoreOffer,
} from "../utils";
import { VStack } from "@chakra-ui/react/stack";
import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";

interface Props {
  product: HttpTypes.StoreProduct;
  offers?: Array<StoreOffer>;
  seller?: SellerDTO;
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"],
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue,
    ) => {
      acc[varopt.option?.title.toLowerCase() || ""] = varopt.value;

      return acc;
    },
    {},
  );
};

export const ProductDetailsHeader = ({ product, offers, seller }: Props) => {
  const { cheapestOffer, cheapestPrice, offerPrice } = getProductWithOfferPrice(
    {
      item: {
        product,
        offers,
      },
    },
  );

  console.log(`Cheapest offer: ${cheapestOffer?.product_variant?.title}`);
  console.log(`Cheapest price: ${cheapestPrice?.calculated_price}`);
  console.log(`Offer price: ${offerPrice?.calculated_price}`);

  return (
    <VStack align="stretch" justify="space-between">
      <Box>
        <Heading>{product.title}</Heading>
      </Box>
    </VStack>
  );
};
