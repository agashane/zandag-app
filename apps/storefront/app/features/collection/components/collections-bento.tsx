import { GridItem } from "@chakra-ui/react/grid";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import type { HttpTypes } from "@mercurjs/types";
import { CollectionCard } from "./collection-card";

interface Props {
  collections: Array<HttpTypes.StoreCollection>;
}

export const CollectionsBento = ({ collections }: Props) => {
  const [first, ...others] = collections!;

  return (
    <SimpleGrid columns={{ smDown: 1, sm: 4 }} gap="4" py="4">
      <GridItem
        colSpan={{ smDown: 1, sm: 2 }}
        bgColor="orange"
        rounded="radius"
        overflow="hidden"
      >
        <CollectionCard collection={first} />
      </GridItem>
      {others.map((collection) => (
        <GridItem
          key={collection.id}
          bgColor="bg.muted"
          rounded="radius"
          overflow="hidden"
        >
          <CollectionCard collection={collection} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
