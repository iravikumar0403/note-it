import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../config/supabaseClient";
import { note } from "../types/notes.types";
import { NoteCard } from "./NoteCard";

export const NotesGrid = () => {
  const [notes, setNotes] = useState<note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .order("created_at", { ascending: false });
      if (data) {
        setNotes([...data]);
      }
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </div>
  );
};
