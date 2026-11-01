import { Flex } from "@chakra-ui/react/flex";
import { ScrollArea } from "@chakra-ui/react/scroll-area";
import { CategoryCard } from "./category-card";
import type { HttpTypes } from "@mercurjs/types";

interface Props {
  categories: Array<HttpTypes.StoreProductCategory>;
}

export const CategoriesScroll = ({ categories }: Props) => {
  return (
    <ScrollArea.Root w="full" size="xs" py="2" variant="hover" rounded="radius">
      <ScrollArea.Viewport>
        <ScrollArea.Content py="2">
          <Flex flexWrap="nowrap" gap="4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" rounded="radius" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
