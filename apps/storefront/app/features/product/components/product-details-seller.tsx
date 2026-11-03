import { Heading } from "@chakra-ui/react/heading";
import { Avatar } from "@chakra-ui/react/avatar";
import { LinkBox, LinkOverlay } from "@chakra-ui/react/link";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Link } from "react-router";
import type { SellerDTO } from "@mercurjs/types";

interface Props {
  seller?: SellerDTO;
}

export const ProductDetailsSeller = ({ seller }: Props) => {
  if (!seller) return null;

  return (
    <LinkBox as="article">
      <HStack align="center">
        <Avatar.Root>
          <Avatar.Image src={seller.logo!} alt={seller.name} />
          <Avatar.Fallback name={seller.name} />
        </Avatar.Root>

        <VStack align="stretch">
          <Heading as="h3" fontSize="md">
            <LinkOverlay asChild>
              <Link to={`/shops/${seller.handle}`}>{seller.name}</Link>
            </LinkOverlay>
          </Heading>
        </VStack>
      </HStack>
    </LinkBox>
  );
};
