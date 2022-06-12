import { AiOutlineFolder } from "react-icons/ai";
import { getFormattedDate } from "../utils";
import { Folder } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";
import { useModal } from "../context";

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOnOutsideClick(() => setShowDropdown(false));
  const { dispatch } = useModal();
  const { created_at, folder_name, notes_count } = folder;

  const renameFolder = () => {
    dispatch({
      type: "RENAME_FOLDER",
      payload: folder,
    });
    setShowDropdown(false);
  };
  const deleteFolder = () => {};

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
              <button
                className="btn-primary flex justify-center items-center bg-red-500 text-black hover:bg-red-400 hover:text-black"
                onClick={deleteFolder}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
