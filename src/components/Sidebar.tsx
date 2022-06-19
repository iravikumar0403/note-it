import { useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal, useNotesContext } from "../context";

export const Sidebar = () => {
  const { folders } = useNotesContext();
  const [isOpen, setIsOpen] = useState(true);
  const { dispatch } = useModal();

  const createFolder = () => {
    dispatch({
      type: "CREATE_FOLDER",
    });
  };

  return (
    <div className="flex flex-col h-[90vh] pr-4 justify-between py-2 border-r">
      <div className="flex flex-col gap-2 ">
        <NavLink
          to="/dashboard/notes"
          className={({ isActive }) =>
            isActive
              ? "p-1 px-4 rounded bg-gray-200"
              : "p-1 px-4 rounded hover:bg-gray-100"
          }
        >
          All Notes
        </NavLink>
        <div
          className={`flex justify-between items-center p-1 px-4 cursor-pointer rounded hover:bg-gray-100`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>Folders</span>
          {isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
        </div>
        <div className="max-h-[60vh] overflow-x-auto flex flex-col gap-2">
          {isOpen &&
            folders.map(({ id, folder_name }) => (
              <NavLink
                to={`/folder/${id}`}
                className={({ isActive }) =>
                  isActive
                    ? "ml-4 p-1 px-4 rounded bg-gray-200"
                    : "ml-4 p-1 px-4 rounded hover:bg-gray-100"
                }
              >
                {folder_name}
              </NavLink>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link to="/notes/new" className="btn-primary text-center py-2 px-8">
          New Note
        </Link>
        <button className="btn-secondary py-2 px-8" onClick={createFolder}>
          New Folder
        </button>
      </div>
    </div>
  );
};
