import { useState } from "react";
import { toast } from "react-toastify";
import { useModal, useNotesContext } from "../../context";
import { createFolder } from "../../services";
import { ButtonWithLoader } from "../ButtonWithLoader";

export const FolderModal = () => {
  const { dispatch: modalDispatch, type, selectedFolder } = useModal();
  const { dispatch: noteDispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [folderName, setFolderName] = useState<string>(() =>
    type === "RENAME_FOLDER" ? selectedFolder?.folder_name || "" : ""
  );
  const handleSubmit = async () => {
    if (folderName === "") {
      toast.error("Please enter the folder name");
      return;
    }
    setIsLoading(true);
    try {
      const data = await createFolder(folderName);
      noteDispatch({
        type: "CREATE_FOLDER",
        payload: data,
      });
      modalDispatch({
        type: "CLOSE_MODAL",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-auto -translate-y-full bg-white p-4 shadow-lg border rounded min-w-[10rem]">
      <h2>Create New Folder</h2>
      <hr />
      <input
        type="text"
        className="my-4 mx-auto border w-full shadow p-1 placeholder-gray-400"
        maxLength={80}
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Type folder name..."
      />
      <ButtonWithLoader
        isLoading={isLoading}
        className="btn-primary flex items-center float-right"
        onClick={handleSubmit}
      >
        Submit
      </ButtonWithLoader>
    </div>
  );
};
