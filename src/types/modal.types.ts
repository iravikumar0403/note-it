import { Folder } from "./folder.types";
import { Note } from "./notes.types";

export type ModalState = {
  isVisible: boolean;
  type: "CREATE_FOLDER" | "RENAME_FOLDER" | "MOVE_TO_FOLDER";
  selectedFolder: Folder | null;
  selectedNote: Note | null;
};

export type ModalAction =
  | {
      type: "CREATE_FOLDER";
    }
  | {
      type: "RENAME_FOLDER";
      payload: Folder;
    }
  | {
      type: "MOVE_TO_FOLDER";
      payload: Note;
    };

export type ModalContextType = {
  isVisible: boolean;
  type: "CREATE_FOLDER" | "RENAME_FOLDER" | "MOVE_TO_FOLDER";
  selectedFolder: Folder | null;
  selectedNote: Note | null;
  dispatch: React.Dispatch<ModalAction>;
};
