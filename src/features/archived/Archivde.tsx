import supabase from "@/config/supabaseClient";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

interface INotes {
  id: number,
  title: string,
  note_content: string,
  date: string,
  archived: boolean
} 


export const Archivide = () => {
  const [error, setError] = useState<string | null >(null)
  const [notes, setNotes] = useState<INotes[] | null>(null);
  
  useEffect(()=>{
    const fetchNotes = async () => {
      const {data, error} = await supabase.from('notes').select('*').eq('archived','TRUE');
      if(error) {
        setError('error fetch data')
        setNotes(null)
      }
      setNotes(data);
      setError(null)
    }
    fetchNotes();
  }, [])
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
    {error && (<p>{error}</p>)}
    {notes && (
      notes.map((note)=>{
        return (
          <Card key={note.id} id={note.id} title={note.title} text={note.note_content} date={note.date} archived={note.archived}/>   
        )
      })
    )}
    </Grid>
  );
}
