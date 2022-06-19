import { Folder } from "../types";
import { AiOutlineFolder } from "react-icons/ai";
import { getFormattedDate } from "../utils";
import { Link } from "react-router-dom";
import { FolderOptions } from "./FolderOptions";

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const { created_at, folder_name, notes_count, id } = folder;

  return (
    <div className="flex flex-col shadow border m-2 p-4 w-[20rem] ">
      <Link to={`/folder/${id}`} className="mb-4">
        <div className="flex mt-2">
          <AiOutlineFolder size={"1.5rem"} />
          <p className="text-xl">{folder_name}</p>
        </div>
        <p className="my-1">{notes_count} notes</p>
      </Link>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 ">
          Created:{" "}
          <span className="text-gray-800">{getFormattedDate(created_at)}</span>
        </p>
        <FolderOptions folder={folder} />
      </div>
    </div>
  );
};
