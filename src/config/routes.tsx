import { FoldersGrid, NotesGrid, RequireAuth } from "../components";
import { Home, Login, Signup, NoteEditor, Dashboard, ViewNote } from "../pages";

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
            element: <FoldersGrid />,
          },
        ],
      },
      {
        path: "/notes/new",
        element: <NoteEditor />,
      },
      {
        path: `/notes/view/:id`,
        element: <ViewNote />,
      },
      {
        path: `/notes/edit/:id`,
        element: <NoteEditor />,
      },
    ],
  },
];
