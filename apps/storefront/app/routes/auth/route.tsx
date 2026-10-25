import { Center } from "@chakra-ui/react/center";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Center
      my="4"
      minH="calc(100vh - 200px)"
      bgGradient="to-br"
      gradientFrom="bg.canvas"
      gradientTo="gold.50"
    >
      <Outlet />
    </Center>
  );
}
