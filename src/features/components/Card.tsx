import { Checkbox } from "@/components/ui/checkbox";
import {
  Badge,
  Box,
  Flex,
  GridItem,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface INotes {
  id: number;
  title: string;
  text: string;
  date: string;
}

export const Card = ({ id, title, text, date }: INotes) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <GridItem
      key={id}
      colSpan={2}
      borderRadius="md"
      px={3}
      py={2}
      boxShadow="0px 6px 12px rgba(0, 112, 243, 0.3)"
      _hover={{ boxShadow: "0px 6px 12px rgba(0, 112, 243, 0.5)" }}
      h={255}
    >
      <Flex direction={"column"} h="100%">
        <Flex justifyContent={"space-between"} align={"center"}>
          <Badge colorPalette="blue" size={"md"} w={"fit"} px={4}>
            New
          </Badge>
          <HStack wrap={"wrap"}>
            <Checkbox
              checked={checked}
              onCheckedChange={(e) => setChecked(!!e.checked)}
              colorPalette={"green"}
            ></Checkbox>
            <IconButton
              aria-label="Search database"
              bg={"white"}
              color={"red.500"}
            >
              <AiFillDelete />
            </IconButton>
            <IconButton
              aria-label="Search database"
              color={"gray.600"}
              bg={"white"}
            >
              <AiFillEdit />
            </IconButton>
          </HStack>
        </Flex>
        <Box flex={"1"} color={"gray.600"}>
          <Text
            fontWeight={"semibold"}
            fontSize={"large"}
            mt={2}
            textWrap={"wrap"}
          >
            {title}
          </Text>
          <Text lineClamp={5}>{text}</Text>
        </Box>
        <Text ml={"auto"} mt={3} color={"gray.600"}>
          {date}
        </Text>
      </Flex>
    </GridItem>
  );
};
