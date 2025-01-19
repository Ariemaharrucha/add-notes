import { GridItem, Input, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNotes } from "./hooks/useNotes";

interface IAddNoteProps {
  onAdd: (note: { title: string; note_content: string; date: string, user_id: string }) => void;
}

export const AddNote = ({ onAdd }: IAddNoteProps) => {
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");
  const [date, setDate] = useState<string | null>(null);
  const {userId} = useNotes();

  const handleSave = () => {
    if (!title || !content || !date) {
      alert("All fields are required.");
      return;
    }
    
    onAdd({ title, note_content: content, date, user_id: userId});

    toaster.success({
      description: "File saved successfully",
      duration: 3000,
    });

  };

  return (
    <GridItem
      colSpan={2}
      borderRadius="md"
      p={2}
      borderWidth={"5px"}
      borderStyle={"dashed"}
      h={255}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderColor={"blue.300"}
    >
      <DialogRoot placement={"top"} motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            color={"blue.500"}
            fontSize={"md"}
            borderColor={"blue.300"}
          >
            Add Notes{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle color={"blue.500"}>Add New Notes</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form action="">
              <Input
                size="lg"
                color="black"
                variant="outline"
                placeholder="Enter note title"
                mb={4}
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <Textarea
                size="lg"
                color="black"
                variant="outline"
                placeholder="Enter note content"
                rows={6}
                _placeholder={{ color: "gray.500" }}
                value={content}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
              />
              <Input
                mt={4}
                type="date"
                size="lg"
                color="black"
                variant="outline"
                mb={4}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg={"blue.600"} onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </GridItem>
  );
};
