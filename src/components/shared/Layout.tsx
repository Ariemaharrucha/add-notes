import { Box, Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";


export const Layout = () => {
  return (
    <Center boxSizing={'border-box'}>
      <Flex direction="column" w="4xl" py={5} mx={'auto'} minHeight="100vh">
        <Header/>
        <Box as="main" flex="1" py={4}  px={2}>
          <Outlet />
        </Box>
      </Flex>
    </Center>
  );
};
