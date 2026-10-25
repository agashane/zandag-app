import { Box } from "@chakra-ui/react/box";
import type { Route } from "./+types/route";
import { Heading } from "@chakra-ui/react/heading";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader() {
  return { message: "Hi" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Container>
      <Heading>Welcome to React Router with 1ilLI0o</Heading>
      <Button>Button</Button>
      <p>{formatDate(new Date())}</p>
    </Container>
  );
}
