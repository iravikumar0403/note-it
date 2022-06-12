import { Note } from "./notes.types";

export type Folder = {
  created_at: string;
  folder_name: string;
  id: string;
  user_id: string;
  notes: Note[];
};
