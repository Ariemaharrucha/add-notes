import { GridItem, Input, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
              />
              <Input
                mt={4}
                type="date"
                size="lg"
                color="black"
                variant="outline"
                mb={4}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
              />
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg={"blue.600"}>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </GridItem>
  );
};
