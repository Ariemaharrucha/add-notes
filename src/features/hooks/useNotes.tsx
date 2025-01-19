import { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { INotes } from "@/utils/note";
import { toaster } from "@/components/ui/toaster";
import { confirmAlert } from "react-confirm-alert";

export const useNotes = () => {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [userId, setUSerId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
    
      if (error || !data?.user) {
        setError("No user session found.");
        return;
      }
    
      setUSerId(data.user.id);
    };
    
    getUserData();
  }, []);

  // fetch data
  useEffect(() => {
    if (!userId) return;
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select('*').eq("user_id", userId);
      if (error) {
        setError("error fetch data");
        setNotes([]);
      }
      setNotes(data || []);
      setError(null);
    };
    fetchNotes();

    const channels = supabase
      .channel("notes-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => {
          console.log("Change received!", payload);

          const newNote = payload.new as INotes;
          const oldNote = payload.old as INotes;

          setNotes((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, newNote];
            }

            if (payload.eventType === "DELETE") {
              return prev.filter((note) => note.id !== oldNote.id);
            }

            if (payload.eventType === "UPDATE") {
              return prev.map((note) =>
                note.id === newNote.id ? { ...note, ...newNote } : note
              );
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [userId]);

  const addNote = async (note: Omit<INotes, "id" | "archived">) => {
    const { data, error } = await supabase.from("notes").insert([note]);
    if (error) throw new Error(error.message);
    return data;
  };

  const handleTitleUpdate = async (id:number, newTitle: string, oldTitle: string) => {
    const { error } = await supabase
      .from("notes")
      .update({ title: newTitle })
      .eq("id", id);

      if (error) {
        toaster.error({
          description: `Failed to update archive status: ${error.message}`,
          duration: 3000,
        });
        setEditedTitle(oldTitle)
      } else {
        toaster.success({
          description: `title successfully updates`,
          duration: 3000,
        });
      }
  }
 
  const handleContentUpdate = async (id:number, newContent: string, oldContent: string) => {
    const { error } = await supabase
      .from("notes")
      .update({ note_content: newContent })
      .eq("id", id);

      if (error) {
        toaster.error({
          description: `Failed to update archive status: ${error.message}`,
          duration: 3000,
        });
        setEditedTitle(oldContent)
      } else {
        toaster.success({
          description: `Note successfully updates`,
          duration: 3000,
        });
      }
  }

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => setEditedContent(e.target.value)
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)

  //delete
  const deleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      toaster.error({
        description: `Failed to delete note: ${error.message}`,
        duration: 3000,
      });
      return;
    }

    toaster.success({
      description: "Note deleted successfully",
      duration: 3000,
    });
  };
  //delete
  const confirmDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this note?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteNote(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleArchiveToggle = async (id: number, archived: boolean) => {
    const { error } = await supabase
      .from("notes")
      .update({ archived: !archived })
      .eq("id", id);

    if (error) {
      toaster.error({
        description: `Failed to update archive status: ${error.message}`,
        duration: 3000,
      });
    } else {
      toaster.success({
        description: `Note ${
          !archived ? "archived" : "unarchived"
        } successfully`,
        duration: 3000,
      });
    }
  };

  return {
    userId,
    notes,
    error,
    addNote,
    confirmDelete,
    handleTitleUpdate,
    editedTitle,
    handleContentUpdate,
    editedContent,
    handleTitle,
    handleContent,
    handleArchiveToggle,
  };
};
