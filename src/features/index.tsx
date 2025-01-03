import { Grid } from "@chakra-ui/react";
import { Card } from "./components/Card";
import { AddNote } from "./AddNote";
import { useNotes } from "./hooks/useNotes";

export const Notes = () => {
  const {
    notes,
    error,
    addNote,
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
      <AddNote onAdd={addNote} />
    </Grid>
  );
};
