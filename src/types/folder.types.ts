import { note } from "./notes.types";

export type folderType = {
  created_at: string;
  folder_name: string;
  id: string;
  user_id: string;
  notes: note[];
};
