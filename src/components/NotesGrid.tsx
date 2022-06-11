import { useNotesContext } from "../context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Loader } from "./Loader";
import { NoteCard } from "./NoteCard";

export const NotesGrid = () => {
  const { loading, notes } = useNotesContext();
  useDocumentTitle("All Notes / Note It");

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </div>
  );
};
