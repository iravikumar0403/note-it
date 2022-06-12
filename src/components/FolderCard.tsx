import dayjs from "dayjs";
import { AiOutlineFolder } from "react-icons/ai";
import { Folder } from "../types";

type FolderCardProps = {
  folder: Folder;
};

export const FolderCard = ({ folder }: FolderCardProps) => {
  const { created_at, folder_name, notes_count } = folder;
  return (
    <div className="flex flex-col shadow border m-2 p-4 w-[20rem] ">
      <div className="flex mt-2">
        <AiOutlineFolder size={"1.5rem"} />
        <p className="text-xl">{folder_name}</p>
      </div>
      <p className="my-1">{notes_count} notes</p>
      <p className="text-gray-500 ">
        Created at:{" "}
        <span className="text-gray-800">
          {dayjs(created_at).format("DD MMM, YYYY")}
        </span>
      </p>
    </div>
  );
};
