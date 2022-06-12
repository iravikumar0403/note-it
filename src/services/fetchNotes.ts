import { supabase } from "../config/supabaseClient";
import { Note } from "../types/notes.types";

export const fetchNotes: () => Promise<Note[]> = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
