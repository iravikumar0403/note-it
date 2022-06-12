import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { notesReducer } from "../reducers";
import { fetchNotes, fetchFolders } from "../services";
import { ChildrenProp, NoteContext, NoteState, Note } from "../types";

const initialValue: NoteState = {
  loading: false,
  notes: [],
  folders: [],
};

const NotesContext = createContext<NoteContext>({} as NoteContext);

export const NotesProvider = ({ children }: ChildrenProp) => {
  const [{ notes, folders }, dispatch] = useReducer(notesReducer, initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [notes, folders] = await Promise.all([
          fetchNotes(),
          fetchFolders(),
        ]);
        dispatch({
          type: "SET_FOLDERS",
          payload: folders,
        });
        dispatch({
          type: "SET_NOTES",
          payload: notes,
        });
      } catch (error) {
        toast.error("Something went wrong");
      }
      setLoading(false);
    })();
  }, []);

  const getNoteById: (id: string) => Note | undefined = (id: string) => {
    const note = notes.find((note: Note) => note.id === id);
    if (note) {
      return note;
    }
  };

  return (
    <NotesContext.Provider
      value={{ loading, notes, folders, getNoteById, dispatch }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
