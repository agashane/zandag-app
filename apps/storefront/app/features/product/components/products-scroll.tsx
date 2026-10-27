import { ScrollArea } from "@chakra-ui/react/scroll-area";
import type { ProductWithOffers } from "../utils/group-offers";
import { Flex } from "@chakra-ui/react/flex";
import { ProductCard } from "./product-card";

interface Props {
  items: Array<ProductWithOffers>;
}

export const ProductsScroll = ({ items }: Props) => {
  return (
    <ScrollArea.Root w="full" size="xs" p="2">
      <ScrollArea.Viewport>
        <ScrollArea.Content p="4">
          <Flex flexWrap="nowrap" gap="4">
            {items.map((item) => (
              <ProductCard key={item.product.id} item={item} />
            ))}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
