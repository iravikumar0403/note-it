import { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../context";

export const AddNewBtn = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { dispatch } = useModal();

  const createFolder = () => {
    dispatch({
      type: "CREATE_FOLDER",
    });
    setShowMenu(false);
  };
  return (
    <div className="fixed bottom-0 right-0 m-4">
      <button
        className="btn-primary flex items-center justify-center text-3xl rounded-full h-12  w-12"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <span>+</span>
      </button>
      {showMenu && (
        <div className="flex flex-col gap-y-2 absolute bottom-0 mb-12 w-[16rem] bg-slate-100 shadow rounded p-6 right-0">
          <Link to="/notes/new" className="btn-primary text-center py-2 px-8">
            New Note
          </Link>
          <button className="btn-secondary py-2 px-8" onClick={createFolder}>
            New Folder
          </button>
        </div>
      )}
    </div>
  );
};
