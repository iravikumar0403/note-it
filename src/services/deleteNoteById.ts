import { supabase } from "../config/supabaseClient";

export const deleteNoteById = async (id: string) => {
  const { data, error } = await supabase.from("notes").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};
