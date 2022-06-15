import { AiOutlineFolder } from "react-icons/ai";
import { getFormattedDate } from "../utils";
import { Folder } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";
import { useModal, useNotesContext } from "../context";
import { deleteFolderById } from "../services/deleteFolder";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { toast } from "react-toastify";

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useOnOutsideClick(() => setShowDropdown(false));
  const { dispatch: modalDispatch } = useModal();
  const { dispatch: notesDispatch } = useNotesContext();
  const { created_at, folder_name, notes_count, is_default, id } = folder;

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
    <div className="flex flex-col shadow border m-2 p-4 w-[20rem] ">
      <div className="flex mt-2">
        <AiOutlineFolder size={"1.5rem"} />
        <p className="text-xl">{folder_name}</p>
      </div>
      <p className="my-1">{notes_count} notes</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 ">
          Created:{" "}
          <span className="text-gray-800">{getFormattedDate(created_at)}</span>
        </p>
        <div className="relative" ref={ref}>
          <button
            className={` rounded-full p-4 ${
              showDropdown ? "bg-slate-100" : ""
            }`}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <BsThreeDotsVertical />
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
      </div>
    </div>
  );
};
