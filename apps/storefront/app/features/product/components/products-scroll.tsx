import { ScrollArea } from "@chakra-ui/react/scroll-area";
import type { ProductWithOffers } from "../utils/group-offers";
import { Flex } from "@chakra-ui/react/flex";
import { ProductCard } from "./product-card";

interface Props {
  items: Array<ProductWithOffers>;
}

export const ProductsScroll = ({ items }: Props) => {
  return (
    <ScrollArea.Root w="full" size="xs" py="2" variant="hover" rounded="radius">
      <ScrollArea.Viewport>
        <ScrollArea.Content py="2">
          <Flex flexWrap="nowrap" gap="4">
            {items.map((item) => (
              <ProductCard key={item.product.id} item={item} />
            ))}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" rounded="radius" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
