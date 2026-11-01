import { Image } from "@chakra-ui/react/image";
import { LinkBox, LinkOverlay } from "@chakra-ui/react/link";
import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import type { HttpTypes } from "@mercurjs/types";
import { Link } from "react-router";
import type { ProductCategoryWithImage } from "../types";
import { FALLBACK_IMAGE_URL } from "~/features/shared/constants";

interface Props {
  category: ProductCategoryWithImage;
}

export const CategoryCard = ({ category }: Props) => {
  const image = category.media_images?.at(0) ?? {
    url: FALLBACK_IMAGE_URL,
  };

  return (
    <LinkBox
      as="div"
      className="group"
      pos="relative"
      overflow="hidden"
      rounded="radius"
      h={{ smDown: "36", sm: "48" }}
      w={{ smDown: "36", sm: "48" }}
    >
      <Image
        src={image.url}
        alt={category.name}
        pos="absolute"
        inset="0"
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.3s ease"
        _groupHover={{ transform: "scale(1.05)" }}
      />

      {/* readability scrim, strongest toward the bottom where the text sits */}
      <Box
        pos="absolute"
        inset="0"
        bg="linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)"
      />

      <LinkOverlay asChild>
        <Link to={`/categories/${category.handle}`}>
          <Box pos="absolute" inset="auto 0 0 0" p="4">
            <Heading color="fg.inverted" fontSize="lg" lineClamp={1}>
              {category.name}
            </Heading>
            {category.description ? (
              <Text
                color="fg.inverted"
                fontSize="xs"
                lineClamp={2}
                transition="display 0.2s ease"
                display="none"
                lineHeight="shorter"
                _groupHover={{ display: "inline-flex" }}
              >
                {category.description}
              </Text>
            ) : null}
          </Box>
        </Link>
      </LinkOverlay>
    </LinkBox>
  );
};
