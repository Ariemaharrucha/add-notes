import supabase from "@/config/supabaseClient";
import { INotes } from "@/utils/note";
import { useEffect, useState } from "react";

export const useArchived = () => {
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<INotes[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("archived", true);

      if (error) {
        setError("Error fetching data");
        setNotes(null);
        return;
      }

      setNotes(data);
      setError(null);
    };
    fetchNotes();

    const channels = supabase
      .channel("archived-notes-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
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

          if (payload.eventType === "UPDATE") {
            if (newNote.archived) {
              //
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
              // Remove note if it was unarchived
              setNotes((prev) =>
                prev ? prev.filter((note) => note.id !== newNote.id) : null
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, []);

  return { error, notes };
};
