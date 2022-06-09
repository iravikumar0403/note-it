import { Outlet } from "react-router-dom";
import { CreateNoteBtn, Navbar, TabLinks } from "../components";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <TabLinks />
      <Outlet />
      <CreateNoteBtn />
    </div>
  );
};
