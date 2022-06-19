import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { AddNewBtn, Navbar, Sidebar, TabLinks } from "../components";
import { useNotesContext } from "../context";
import { fetchFolders, fetchNotes } from "../services";

export const Dashboard = () => {
  const { dispatch } = useNotesContext();

  useEffect(() => {
    (async () => {
      try {
        const [notes, folders] = await Promise.all([
          fetchNotes(),
          fetchFolders(),
        ]);
        dispatch({
          type: "SET_FOLDERS",
          payload: folders,
        });
        dispatch({
          type: "SET_NOTES",
          payload: notes,
        });
      } catch (error) {
        toast.error("Something went wrong");
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <TabLinks />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 md:px-4">
        <div className=" col-span-3 hidden md:block">
          <Sidebar />
        </div>
        <div className="col-start-1 md:col-start-4 col-end-13">
          <Outlet />
        </div>
      </div>
      <AddNewBtn />
    </div>
  );
};
