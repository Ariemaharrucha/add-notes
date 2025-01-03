import { Grid } from "@chakra-ui/react";
import { Card } from "../components/Card";
import { useNotes } from "../hooks/useNotes";
import { useArchived } from "./hooks/useArchived";

export const Archivide = () => {
  const { error, notes } = useArchived();

  const {
    confirmDelete,
    handleArchiveToggle,
    handleTitleUpdate,
    editedTitle,
    handleContentUpdate,
    editedContent,
    handleTitle,
    handleContent,
  } = useNotes();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      {error && <p>{error}</p>}
      {notes &&
        notes.map((note) => {
          return (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.note_content}
              date={note.date}
              archived={note.archived}
              onDelete={confirmDelete}
              onArchived={handleArchiveToggle}
              handleTitleUpdate={handleTitleUpdate}
              editedTitle={editedTitle}
              handleContentUpdate={handleContentUpdate}
              editedContent={editedContent}
              handleContent={handleContent}
              handleTitle={handleTitle}
            />
          );
        })}
    </Grid>
  );
};
