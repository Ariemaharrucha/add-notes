import { Grid } from "@chakra-ui/react";
import { Card } from "./components/Card";
import { AddNote } from "./AddNote";
import { useNotes } from "./hooks/useNotes";
import supabase from "@/config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Notes = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/"); 
      }
    };

    checkSession();
  }, [navigate]);
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
