import { Checkbox } from "@/components/ui/checkbox";
import supabase from "@/config/supabaseClient";
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
import { toaster } from "@/components/ui/toaster";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

interface INotes {
  id: number;
  title: string;
  text: string;
  date: string;
  archived: boolean;
}

export const Card = ({ id, title, text, date, archived }: INotes) => {
  const [isArchived, setIsArchived] = useState<boolean>(archived);

  async function handleDelete(id: number) {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      toaster.error({
        description: `Failed to delete note: ${error.message}`,
        duration: 3000,
      });
      return;
    }

    toaster.success({
      description: "Note deleted successfully",
      duration: 3000,
    });
  }

  const confirmDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this note?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  async function changeArchive(id: number, archived: boolean) {
    const { error } = await supabase
      .from("notes")
      .update({ archived: !archived })
      .eq("id", id);

    if (error) {
      console.error("Error archiving note:", error.message);
      return false;
    }

    return true;
  }

  const handleCheckboxChange = async () => {
    const success = await changeArchive(id, isArchived);
    if (success) {
      setIsArchived(!isArchived);
    }
  };

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
              checked={isArchived}
              onCheckedChange={handleCheckboxChange}
              colorPalette={"green"}
              borderRadius="md"
              borderWidth="2px"
              cursor={'pointer'}
            ></Checkbox>
            <IconButton
              aria-label="Delete note"
              bg={"white"}
              color={"red.500"}
              onClick={() => confirmDelete(id)}
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
            <IconButton
              aria-label="Edit note"
              color={"blue.600"}
              bg={"white"}
              borderRadius="md"
              borderWidth="3px"
              borderColor="blue.400"
              _hover={{
                bg: "blue.50",
                color: "blue.800",
                borderColor: "blue.500",
              }}
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
