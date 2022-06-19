import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import { useModal, useNotesContext } from "../context";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";
import { deleteFolderById } from "../services/deleteFolder";
import { Folder } from "../types";
import { ButtonWithLoader } from "./ButtonWithLoader";

type FolderOptionsProps = {
  folder: Folder;
};

export const FolderOptions = ({ folder }: FolderOptionsProps) => {
  const { dispatch: modalDispatch } = useModal();
  const { dispatch: notesDispatch } = useNotesContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useOnOutsideClick(() => setShowDropdown(false));
  const { id, is_default } = folder;

  const renameFolder = () => {
    modalDispatch({
      type: "RENAME_FOLDER",
      payload: folder,
    });
    setShowDropdown(false);
  };

  const deleteFolder = async () => {
    if (is_default) {
      toast.error("Cannot delete default folder");
      setShowDropdown(false);
      return;
    }
    try {
      setIsLoading(true);
      await deleteFolderById(id);
      notesDispatch({
        type: "DELETE_FOLDER",
        payload: id,
      });
      toast.success("Folder and it's content are deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={`rounded-full p-2 ${showDropdown ? "bg-slate-100" : ""}`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <BsThreeDots size="1.4rem" />
      </button>
      {showDropdown && (
        <div className="flex flex-col gap-y-2 w-[10rem] bg-slate-100 px-4 py-2 z-10 rounded absolute right-0">
          <button
            className="btn-primary text-center w-full"
            onClick={renameFolder}
          >
            Rename
          </button>
          <ButtonWithLoader
            isLoading={isLoading}
            className="btn-primary flex justify-center items-center bg-red-500 text-black hover:bg-red-400 hover:text-black"
            onClick={deleteFolder}
          >
            Delete
          </ButtonWithLoader>
        </div>
      )}
    </div>
  );
};
