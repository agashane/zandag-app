import { Button } from "@chakra-ui/react/button";
import { EmptyState } from "@chakra-ui/react/empty-state";
import { Link } from "react-router";

export const CollectionNotFound = () => {
  return (
    <EmptyState.Root rounded="radius">
      <EmptyState.Content>
        <EmptyState.Title>Introuvable</EmptyState.Title>
        <EmptyState.Description>
          La collection que vous recherchez est introuvable
        </EmptyState.Description>

        <Button asChild>
          <Link to="/collections">Explorer toutes les collections</Link>
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
