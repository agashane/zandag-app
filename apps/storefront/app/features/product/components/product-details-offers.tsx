import { For } from "@chakra-ui/react/for";
import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/text";

import { getPricesForOffer, type StoreOffer } from "../utils";
import { convertToLocale } from "~/features/shared/utils/money";
import { HStack } from "@chakra-ui/react/stack";

interface Props {
  offers: Array<StoreOffer>;
}

const OfferCard = ({ offer }: { offer: StoreOffer }) => {
  const prices = getPricesForOffer(offer);

  return (
    <HStack>
      <Text>{offer.product_variant?.title}</Text>
      <Text>{prices?.calculated_price}</Text>
    </HStack>
  );
};

export const ProductDetailsOffers = ({ offers }: Props) => {
  return (
    <For each={offers}>
      {(offer) => <OfferCard key={offer.id} offer={offer} />}
    </For>
  );
};
