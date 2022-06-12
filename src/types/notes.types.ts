import { Folder } from "./folder.types";

export type Note = {
  title: string;
  created_at: string;
  folder_id: string;
  id: string;
  tags: string[];
  user_id: string;
  content: any;
  text_content: string;
};

export type NoteState = {
  loading: boolean;
  notes: Note[];
  folders: Folder[];
};

export type NoteContext = {
  loading: boolean;
  notes: Note[];
  folders: Folder[];
  getNoteById: (id: string) => Note | undefined;
  dispatch: React.Dispatch<NoteAction>;
};

export type NoteAction =
  | {
      type: "INIT_LOADING";
    }
  | {
      type: "SET_NOTES";
      payload: Note[];
    }
  | {
      type: "SET_FOLDERS";
      payload: Folder[];
    }
  | {
      type: "DELETE_NOTE";
      payload: string;
    };
