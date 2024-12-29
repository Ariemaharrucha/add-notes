import { GridItem, Input, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import supabase from "@/config/supabaseClient";
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

export const AddNote = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleSaveote() {
    if (!title || !content || !date) {
      toaster.error({
        description: "Fill All Field",
        duration: 3000,
      });
      return;
    }
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, note_content: content, date: date }]);
    console.log(`Triggering toaster.create ${data}`);

    if (error) {
      toaster.error({
        description: `${error}`,
        duration: 3000,
      });
      return;
    }

    toaster.success({
      description: "File saved successfully",
      duration: 3000,
    });
    setTitle(null);
    setContent(null);
    setDate(null);
    setIsOpen(false);
  }
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
      <DialogRoot
        placement={"top"}
        motionPreset="slide-in-bottom"
        open={isOpen}
        onOpenChange={(open) => setIsOpen(!!open)}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            color={"blue.500"}
            fontSize={"md"}
            borderColor={"blue.300"}
            onClick={() => setIsOpen(true)}
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
            <Button bg={"blue.600"} onClick={handleSaveote}>
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </GridItem>
  );
};
