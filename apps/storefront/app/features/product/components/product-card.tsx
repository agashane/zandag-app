import { Card } from "@chakra-ui/react/card";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Image } from "@chakra-ui/react/image";
import { Box } from "@chakra-ui/react/box";

import type { ProductWithOffers } from "../utils/group-offers";
import { pluralize } from "~/lib/utils";
import { LinkBox, LinkOverlay } from "@chakra-ui/react/link";
import { Link } from "react-router";
import { getProductWithOfferPrice } from "../utils";
import { IconButton } from "@chakra-ui/react/button";
import { RiArrowLeftFill, RiArrowRightLine } from "react-icons/ri";

interface Props {
  item: ProductWithOffers;
}

export const ProductCard = ({ item }: Props) => {
  if (!item) {
    return null;
  }

  const { cheapestPrice } = getProductWithOfferPrice({ item });
  const productName = String(item.product.title || "Produit");

  return (
    <LinkBox
      minW="48"
      maxW="sm"
      overflow="hidden"
      className="group"
      as="article"
      rounded="radius"
    >
      <Card.Root rounded="radius">
        <Box bgColor="bg.muted" rounded="radius" overflow="hidden">
          {item.product.thumbnail ? (
            <Image
              src={item.product.thumbnail}
              alt={productName}
              _groupHover={{
                scale: "1.2",
                transition: "all 0.2s ease-in",
              }}
            />
          ) : null}
        </Box>
        <Card.Body px="4" py="2">
          <Card.Title
            lineHeight="shorter"
            fontSize="sm"
            rounded="radius"
            lineClamp="2"
            _groupHover={{ colorPalette: "teal" }}
          >
            <LinkOverlay
              aria-label={`Détails sur ${productName}`}
              title={`Détails sur ${productName}`}
              asChild
            >
              <Link to={`/products/${item.product.handle}`}>{productName}</Link>
            </LinkOverlay>
          </Card.Title>
          <Text fontSize="xs" color="fg.muted" lineHeight="shorter">
            {item.seller.name}
          </Text>
          <HStack gap="2" align="baseline">
            <VStack align="stretch" gap="0" mt="2" flex="1">
              {cheapestPrice?.calculated_price !==
                cheapestPrice?.original_price && (
                <Text fontSize="sm" color="fg.error" textDecor="line-through">
                  {cheapestPrice?.original_price}
                </Text>
              )}
              <Text fontWeight="medium">{cheapestPrice?.calculated_price}</Text>
            </VStack>
            <IconButton size="sm" variant="ghost" rounded="radius">
              <RiArrowRightLine />
            </IconButton>
          </HStack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
};
