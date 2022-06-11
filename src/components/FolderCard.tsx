import dayjs from "dayjs";
import { AiOutlineFolder } from "react-icons/ai";
import { folderType } from "../types/folder.types";

type folderCardProps = {
  folder: folderType;
};

export const FolderCard = ({ folder }: folderCardProps) => {
  const { created_at, folder_name, notes } = folder;
  return (
    <div className="flex flex-col shadow border m-2 p-4 w-[20rem] ">
      <div className="flex mt-2">
        <AiOutlineFolder size={"1.5rem"} />
        <p className="text-xl">{folder_name}</p>
      </div>
      {/* todo
        add fix for notes count in a folder
      */}
      {/* <p className="my-1">{notes.length} notes</p> */}
      <p className="text-gray-500 ">
        Created at:{" "}
        <span className="text-gray-800">
          {dayjs(created_at).format("DD MMM, YYYY")}
        </span>
      </p>
    </div>
  );
};
