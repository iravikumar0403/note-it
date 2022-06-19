import { useNavigate, useParams } from "react-router-dom";
import {
  AddNewBtn,
  FolderOptions,
  Navbar,
  NotesGrid,
  Sidebar,
} from "../components";
import { useNotesContext } from "../context";

export const FolderView = () => {
  const { id } = useParams();
  const { folders } = useNotesContext();
  const navigate = useNavigate();

  const currentFolder = folders.find((folder) => folder.id === id);
  if (!currentFolder) {
    navigate(-1);
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 md:px-4">
        <div className=" col-span-3 hidden md:block">
          <Sidebar />
        </div>
        <div className="col-start-1 md:col-start-4 col-end-13">
          <div className="flex items-center md:mx-8 mx-2 my-2 border-b justify-between">
            <h2 className="text-xl">{currentFolder?.folder_name}</h2>
            <FolderOptions folder={currentFolder} />
          </div>
          <NotesGrid />
        </div>
      </div>
      <AddNewBtn />
    </div>
  );
};
