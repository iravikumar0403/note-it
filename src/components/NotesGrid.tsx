import { useNotesContext } from "../context";
import { Loader } from "./Loader";
import { NoteCard } from "./NoteCard";

export const NotesGrid = () => {
  const { loading, notes } = useNotesContext();

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
