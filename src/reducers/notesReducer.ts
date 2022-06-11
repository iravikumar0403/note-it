import { noteContextState, noteReducerAction } from "../types";

export const notesReducer = (
  state: noteContextState,
  action: noteReducerAction
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
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};
