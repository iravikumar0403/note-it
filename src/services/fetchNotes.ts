import { supabase } from "../config/supabaseClient";
import { note } from "../types/notes.types";

export const fetchNotes: () => Promise<note[]> = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
