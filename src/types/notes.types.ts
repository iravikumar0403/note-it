import React from "react";
import { folderType } from "./folder.types";

export type note = {
  title: string;
  created_at: string;
  folder_id: string;
  id: string;
  tags: string[];
  user_id: string;
  content: any;
  text_content: string;
};

export type noteContextState = {
  notes: note[];
  folders: folderType[];
};

export type notesContext = {
  loading: boolean;
  notes: note[];
  folders: folderType[];
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
};
