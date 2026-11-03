import { Box } from "@chakra-ui/react/box";
import { Image } from "@chakra-ui/react/image";
import { ScrollArea } from "@chakra-ui/react/scroll-area";
import { HStack, VStack } from "@chakra-ui/react/stack";
import type { HttpTypes } from "@mercurjs/types";
import React from "react";
import { FALLBACK_IMAGE_URL } from "~/features/shared/constants";

interface Props {
  product: HttpTypes.StoreProduct;
}

export const ProductImages = ({ product }: Props) => {
  const [activeImage] = React.useState(0);
  const placeholder = product.thumbnail ?? FALLBACK_IMAGE_URL;

  return (
    <VStack align="stretch" flex="1">
      <Box h="40rem" w="full" rounded="radius" overflow="hidden">
        <Image
          src={product.images?.at(activeImage)?.url ?? placeholder}
          alt={product.title}
          rounded="radius"
          h="full"
          w="full"
          objectFit="cover"
          objectPosition="center"
          fetchPriority="high"
        />
      </Box>
      <ScrollArea.Root py="2">
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <HStack align="center" gap="2" flexWrap="nowrap" w="full">
              {product.images?.map((image, idx) => (
                <Box
                  key={image.id}
                  w="24"
                  h="24"
                  overflow="hidden"
                  rounded="radius"
                  borderWidth="1px"
                  borderColor={activeImage === idx ? "border" : "border.muted"}
                  cursor="pointer"
                >
                  <Image
                    src={image.url ?? FALLBACK_IMAGE_URL}
                    alt={product.title}
                    fetchPriority="low"
                    rounded="radius"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
              ))}
            </HStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </VStack>
  );
};
