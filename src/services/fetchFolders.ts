import { supabase } from "../config/supabaseClient";
import { Folder } from "../types/folder.types";

export const fetchFolders: () => Promise<Folder[]> = async () => {
  const { data, error } = await supabase.rpc("get_folders");
  if (error) {
    throw error;
  }
  return data;
};
