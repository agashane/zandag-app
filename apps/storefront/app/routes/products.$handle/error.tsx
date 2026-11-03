import { EmptyState } from "@chakra-ui/react/empty-state";

export const ErrorBoundary = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Title>Produit introuvable</EmptyState.Title>
        <EmptyState.Description>
          Le produit que vous recherchez est introuvable...
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
