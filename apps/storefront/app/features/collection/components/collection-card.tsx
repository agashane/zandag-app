import { Image } from "@chakra-ui/react/image";
import { LinkBox, LinkOverlay } from "@chakra-ui/react/link";
import { Box } from "@chakra-ui/react/box";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/heading";
import type { HttpTypes } from "@mercurjs/types";
import { Link } from "react-router";
import { FALLBACK_IMAGE_URL } from "~/features/shared/constants";
import { Button } from "@chakra-ui/react/button";
import { RiArrowRightLine } from "react-icons/ri";
import { Card } from "@chakra-ui/react/card";
import { VStack } from "@chakra-ui/react/stack";

interface Props {
  collection: HttpTypes.StoreCollection;
}

export const CollectionCard = ({ collection }: Props) => {
  const image = collection.media_images?.at(0) ?? {
    url: FALLBACK_IMAGE_URL,
  };

  return (
    <LinkBox as="div">
      <Card.Root
        rounded="radius"
        variant="subtle"
        h="full"
        w="full"
        bgColor="transparent"
      >
        <Card.Body>
          <VStack align="stretch">
            <Card.Title>{collection.title}</Card.Title>
            <LinkOverlay asChild>
              <Link to={`/collections/${collection.handle}`}>
                <Button variant="subtle" rounded="radius" size="sm">
                  Explorer
                  <RiArrowRightLine />
                </Button>
              </Link>
            </LinkOverlay>
          </VStack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
};
