import { useParams } from "react-router-dom";
import { useNotesContext } from "../context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Loader } from "./Loader";
import { NoteCard } from "./NoteCard";

export const NotesGrid = () => {
  const { id } = useParams();
  const { loading, notes } = useNotesContext();
  useDocumentTitle("All Notes / Note It");
  let notesToRender = notes;
  if (id) {
    notesToRender = notes.filter((note) => note.folder_id === id);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {notesToRender.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </div>
  );
};
