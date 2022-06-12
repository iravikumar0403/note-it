import { supabase } from "../config/supabaseClient";
import { Folder } from "../types/folder.types";

export const fetchFolders: () => Promise<Folder[]> = async () => {
  const { data, error } = await supabase
    .from("folders")
    .select()
    // .select("*, notes!inner(*)")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
