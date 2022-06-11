import { useNotesContext } from "../context";
import { FolderCard } from "./FolderCard";
import { Loader } from "./Loader";

export const FoldersGrid = () => {
  const { loading, folders } = useNotesContext();

  if (loading) return <Loader />;

  return (
    <div className="flex flex-wrap justify-center">
      {folders.map((folder) => (
        <FolderCard folder={folder} key={folder.id} />
      ))}
    </div>
  );
};
