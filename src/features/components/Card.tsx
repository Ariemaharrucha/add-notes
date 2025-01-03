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
import { AiFillDelete } from "react-icons/ai";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Editable } from "@chakra-ui/react";

interface ICardProps {
  id: number;
  title: string;
  text: string;
  date: string;
  archived: boolean;
  onDelete: (id: number) => void;
  onArchived: (id: number, archived: boolean) => void;
  handleTitleUpdate: (id: number, newTitle: string, title: string) => void;
  handleTitle: () => void;
  editedTitle: string;
  handleContentUpdate: (
    id: number,
    newContent: string,
    content: string
  ) => void;
  handleContent: () => void;
  editedContent: string;
}

export const Card = ({
  id,
  title,
  text,
  date,
  archived,
  onDelete,
  onArchived,
  handleTitleUpdate,
  handleTitle,
  editedTitle,
  handleContentUpdate,
  handleContent,
  editedContent,
}: ICardProps) => {
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

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
              checked={archived}
              onCheckedChange={() => onArchived(id, archived)}
              colorPalette={"green"}
              borderRadius="md"
              borderWidth="2px"
              cursor={"pointer"}
            ></Checkbox>
            <IconButton
              aria-label="Delete note"
              bg={"white"}
              color={"red.500"}
              onClick={() => onDelete(id)}
              borderRadius="md"
              borderWidth="3px"
              borderColor="red.300"
              _hover={{
                bg: "red.50",
                color: "red.700",
                borderColor: "red.500",
              }}
            >
              <AiFillDelete />
            </IconButton>
          </HStack>
        </Flex>
        <Box flex={"1"} color={"gray.600"}>
          <Editable.Root
            fontWeight={"semibold"}
            fontSize={"large"}
            mt={2}
            textWrap={"wrap"}
            value={title}
            onChange={handleTitle}
          >
            <Editable.Preview width={"full"} />
            <Editable.Input
              onBlur={() => handleTitleUpdate(id, editedTitle, title)}
            />
          </Editable.Root>
          <Editable.Root value={text} onChange={handleContent}>
            <Editable.Preview
              alignItems="flex-start"
              width="full"
              lineClamp={5}
              fontSize={"md"}
            />
            <Editable.Textarea
              onBlur={() => handleContentUpdate(id, editedContent, text)}
            />
          </Editable.Root>
        </Box>
        <Text ml={"auto"} mt={3} color={"gray.600"}>
          {formattedDate}
        </Text>
      </Flex>
    </GridItem>
  );
};
