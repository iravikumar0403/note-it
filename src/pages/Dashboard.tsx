import { Outlet } from "react-router-dom";
import { Navbar, TabLinks } from "../components";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <TabLinks />
      <Outlet />
    </div>
  );
};
