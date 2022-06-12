import { supabase } from "../config/supabaseClient";

export const createFolder = async (folder_name: string) => {
  const { data, error } = await supabase
    .from("folders")
    .insert([{ folder_name }]);
  if (error) {
    throw error;
  }
  return { ...data[0], notes_count: 0 };
};
