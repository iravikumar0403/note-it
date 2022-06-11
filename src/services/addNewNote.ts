import { JSONContent } from "@tiptap/react";
import { supabase } from "../config/supabaseClient";

export const addNewNote = async (note: {
  title: string;
  content: JSONContent;
  text_content: string;
  tags: string[];
  folder_id: string;
}) => {
  const { data, error } = await supabase.from("notes").insert([note]);
  if (error) {
    throw error;
  }
  return data;
};
