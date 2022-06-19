import { useParams } from "react-router-dom";
import { AddNewBtn, Navbar, NotesGrid } from "../components";
import { useNotesContext } from "../context";

export const FolderView = () => {
  const { id } = useParams();
  const { folders } = useNotesContext();

  const currentFolder = folders.find((folder) => folder.id === id);
  return (
    <div>
      <Navbar />
      <h2 className="text-center text-xl my-4">{currentFolder?.folder_name}</h2>
      <NotesGrid />
      <AddNewBtn />
    </div>
  );
};
