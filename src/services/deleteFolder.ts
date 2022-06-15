import { supabase } from "../config/supabaseClient";

export const deleteFolderById = async (id: string) => {
  const { data, error } = await supabase.from("folders").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};
