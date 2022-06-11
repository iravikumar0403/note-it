import { JSONContent } from "@tiptap/react";
import { supabase } from "../config/supabaseClient";

export const updateNote = async (
  note: {
    title: string;
    content: JSONContent;
    text_content: string;
    tags: string[];
    folder_id: string;
  },
  id: string
) => {
  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .match({ id });
  if (error) {
    throw error;
  }

  return data;
};
