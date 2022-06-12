import { supabase } from "../config/supabaseClient";

export const renameFolder = async (id: string, folder_name: string) => {
  const { data, error } = await supabase
    .from("folders")
    .update({ folder_name })
    .match({ id });
  if (error) {
    throw error;
  }
  return data[0];
};
