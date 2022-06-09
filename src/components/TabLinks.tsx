import { NavLink } from "react-router-dom";

export const TabLinks = () => {
  return (
    <div className="shadow flex divide-x">
      <NavLink
        to="/dashboard/notes"
        className={({ isActive }) =>
          isActive
            ? "w-full p-4 text-center border-b-2 border-b-green-500"
            : "w-full p-4 text-center"
        }
      >
        All Notes
      </NavLink>
      <NavLink
        to="/dashboard/folders"
        className={({ isActive }) =>
          isActive
            ? "w-full p-4 text-center border-b-2 border-b-green-500"
            : "w-full p-4 text-center"
        }
      >
        Folders
      </NavLink>
    </div>
  );
};
