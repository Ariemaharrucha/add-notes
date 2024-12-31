import supabase from "@/config/supabaseClient";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

interface INotes {
  id: number;
  title: string;
  note_content: string;
  date: string;
  archived: boolean;
}

export const Unarchived = () => {
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<INotes[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("archived", "FALSE");
      if (error) {
        setError("error fetch data");
        setNotes(null);
      }
      setNotes(data);
      setError(null);
    };
    fetchNotes();

    const channels = supabase.channel('unarchived-notes-channel').on("postgres_changes", { event: "*", schema: "public", table: "notes" },
      (payload) => {
        console.log("Change received!", payload);

        const newNote = payload.new as INotes;
        const oldNote = payload.old as INotes;

        if (payload.eventType === "INSERT" && newNote.archived) {
          setNotes((prev) => (prev ? [...prev, newNote] : [newNote]));
        }

        if (payload.eventType === "DELETE" && oldNote.archived) {
          setNotes((prev) =>
            prev ? prev.filter((note) => note.id !== oldNote.id) : null
          );
        }

        if(payload.eventType === "UPDATE") {
          if (!newNote.archived) {
            setNotes((prev) =>
              prev
                ? prev.some((note) => note.id === newNote.id)
                  ? prev.map((note) =>
                      note.id === newNote.id ? { ...note, ...newNote } : note
                    )
                  : [...prev, newNote]
                : [newNote]
            );
          } else {
            setNotes((prev) =>
              prev ? prev.filter((note) => note.id !== newNote.id) : null
            );
          }
        }

      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, []);
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
            />
          );
        })}
    </Grid>
  );
};
