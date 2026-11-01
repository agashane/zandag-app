import { Text } from "@chakra-ui/react/text";
import { Heading } from "@chakra-ui/react/heading";
import { HStack, VStack } from "@chakra-ui/react/stack";
import type React from "react";
import { Button } from "@chakra-ui/react/button";
import { Link } from "react-router";
import { RiArrowRightLine } from "react-icons/ri";
import { Box } from "@chakra-ui/react/box";

interface Props extends React.PropsWithChildren {
  heading: string;
  subheading?: string;
  more_link?: string;
  more_label?: string;
}

export const DefaultSection = ({
  heading,
  subheading,
  more_label,
  more_link,
  children,
}: Props) => {
  return (
    <VStack align="stretch" gap="0">
      <HStack>
        <VStack align="stretch" gap="0" flex="1">
          <Heading as="h2" fontSize={{ smDown: "lg", sm: "xl" }}>
            {heading}
          </Heading>
          {subheading && (
            <Text fontSize="sm" color="fg.muted">
              {subheading}
            </Text>
          )}
        </VStack>
        {more_link && (
          <Button
            variant="ghost"
            colorPalette="gray"
            size="sm"
            rounded="radius"
            asChild
          >
            <Link to={more_link}>
              {more_label ?? "Voir plus"} <RiArrowRightLine />
            </Link>
          </Button>
        )}
      </HStack>
      <Box flex="1">{children}</Box>
    </VStack>
  );
};
