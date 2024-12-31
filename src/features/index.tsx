import { Grid } from "@chakra-ui/react";
import { Card } from "./components/Card";
import { AddNote } from "./components/AddCard";
import { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";

interface INotes {
  id: number;
  title: string;
  note_content: string;
  date: string;
  archived: boolean;
}

export const Notes = () => {
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<INotes[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) {
        setError("error fetch data");
        setNotes(null);
      }
      setNotes(data);
      setError(null);
    };
    fetchNotes();

    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          console.log("Change received!", payload);

          const newNote = payload.new as INotes;
          const oldNote = payload.old as INotes;

          if (payload.eventType === "INSERT") {
            setNotes((prev) => (prev ? [...prev, newNote] : [oldNote]));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, []);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      <AddNote />
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
            />
          );
        })}
    </Grid>
  );
};
