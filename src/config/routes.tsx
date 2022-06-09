import { NotesGrid } from "../components";
import { RequireAuth } from "../components/RequireAuth";
import { Home, Login } from "../pages";
import { Dashboard } from "../pages/Dashboard";
import { Signup } from "../pages/Signup";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard",
            element: <NotesGrid />,
          },
          {
            path: "/dashboard/notes",
            element: <NotesGrid />,
          },
          {
            path: "/dashboard/folders",
          },
        ],
      },
    ],
  },
];
