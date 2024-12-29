import {
  Grid,
} from "@chakra-ui/react";
import { Card } from "./components/Card";
import { AddNote } from "./components/AddCard";

export const Notes = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
    <Card />
    <AddNote/>
    </Grid>
  );
};
