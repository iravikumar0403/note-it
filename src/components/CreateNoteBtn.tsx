import { Link } from "react-router-dom";

export const CreateNoteBtn = () => {
  return (
    <Link
      to="/notes/new"
      className="btn-primary flex items-center justify-center text-3xl rounded-full h-12  w-12 fixed bottom-0 right-0 m-4"
    >
      <span>+</span>
    </Link>
  );
};
