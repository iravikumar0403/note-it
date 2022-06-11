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
import { children, folderType, note, notesContext } from "../types";

const initialValue = {
  loading: false,
  notes: [] as note[],
  folders: [] as folderType[],
};

const NotesContext = createContext<notesContext>({} as notesContext);

export const NotesProvider = ({ children }: children) => {
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
          payload: notes,
        });
        dispatch({
          type: "SET_NOTES",
          payload: folders,
        });
      } catch (error) {
        toast.error("Something went wrong");
      }
      setLoading(false);
    })();
  }, []);

  const getNoteById: (id: string) => note = (id: string) => {
    const note = notes.find((note: note) => note.id === id);
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
