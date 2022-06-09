import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../context/user-context";

export const RequireAuth = () => {
  const { user } = useUserContext();
  const location = useLocation();

  if (user) return <Outlet />;

  return <Navigate to="/login" replace={true} state={{ from: location }} />;
};
