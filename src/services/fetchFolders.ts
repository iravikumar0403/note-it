import { supabase } from "../config/supabaseClient";
import { folderType } from "../types/folder.types";

export const fetchFolders: () => Promise<folderType[]> = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
