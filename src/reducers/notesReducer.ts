import { noteContextState } from "../types/notes.types";

export const notesReducer = (
  state: noteContextState,
  action: { type: string; payload?: any }
) => {
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
    default:
      return state;
  }
};
