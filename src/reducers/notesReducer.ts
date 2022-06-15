import { NoteState, NoteAction } from "../types";

export const notesReducer = (state: NoteState, action: NoteAction) => {
  switch (action.type) {
    case "INIT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_NOTES":
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };

    case "SET_FOLDERS":
      return {
        ...state,
        loading: false,
        folders: action.payload,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "CREATE_FOLDER":
      return {
        ...state,
        folders: [action.payload, ...state.folders],
      };
    case "RENAME_FOLDER": {
      const folders = state.folders.filter(
        (folder) => folder.id !== action.payload.id
      );
      return {
        ...state,
        folders: [action.payload, ...folders],
      };
    }
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== action.payload),
        notes: state.notes.filter((note) => note.folder_id !== action.payload),
      };
    default:
      return state;
  }
};
