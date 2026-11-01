import { EmptyState } from "@chakra-ui/react/empty-state";

export const CategoryNotFound = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Title>Introuvable</EmptyState.Title>
        <EmptyState.Description>
          La catégorie recherchée est introuvable
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
