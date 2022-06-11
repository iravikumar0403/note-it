import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { AddNewBtn, Navbar, TabLinks } from "../components";
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
          payload: notes,
        });
        dispatch({
          type: "SET_NOTES",
          payload: folders,
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
      <Outlet />
      <AddNewBtn />
    </div>
  );
};
