import { Box } from "@chakra-ui/react/box";
import { IconButton } from "@chakra-ui/react/button";
import { Card } from "@chakra-ui/react/card";
import { Image } from "@chakra-ui/react/image";
import { LinkBox, LinkOverlay } from "@chakra-ui/react/link";
import { HStack, VStack } from "@chakra-ui/react/stack";
import type { HttpTypes } from "@mercurjs/types";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router";
import { FALLBACK_IMAGE_URL } from "~/features/shared/constants";

interface Props {
  product: HttpTypes.StoreProduct;
}

export const SimpleProduct = ({ product }: Props) => {
  if (!product) return null;

  const productName = String(product.title || "Produit");
  const thumbnail = product.thumbnail ?? FALLBACK_IMAGE_URL;

  return (
    <LinkBox
      minW="48"
      maxW="sm"
      overflow="hidden"
      className="group"
      as="article"
      rounded="radius"
      h="72"
    >
      <Card.Root rounded="radius" h="full">
        <Box bgColor="bg.muted" rounded="radius" overflow="hidden" h="60">
          <Image
            src={thumbnail}
            alt={productName}
            _groupHover={{
              scale: "1.2",
              transition: "all 0.2s ease-in",
            }}
            h="full"
            w="full"
          />
        </Box>
        <Card.Body px="4" py="2" flex="1">
          <VStack align="stretch" flex="1" gap="1">
            <Card.Title
              lineHeight="shorter"
              fontSize="sm"
              rounded="radius"
              lineClamp="2"
              _groupHover={{
                color: "colorPalette.fg",
                transition: "all .2s ease-in",
              }}
            >
              <LinkOverlay
                aria-label={`Détails sur ${productName}`}
                title={`Détails sur ${productName}`}
                asChild
              >
                <Link to={`/products/${product.handle}`}>{productName}</Link>
              </LinkOverlay>
            </Card.Title>
          </VStack>
          <HStack gap="2" align="baseline">
            <IconButton size="sm" variant="ghost" rounded="radius">
              <RiArrowRightLine />
            </IconButton>
          </HStack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
};
