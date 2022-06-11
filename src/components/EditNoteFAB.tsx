import { Link, useParams } from "react-router-dom";
import { HiPencil } from "react-icons/hi";

export const CreateNoteBtn = () => {
  const { id } = useParams();
  return (
    <Link
      to={`/notes/edit/${id}`}
      className="btn-primary flex items-center justify-center text-3xl rounded-full h-12  w-12 fixed bottom-0 right-0 m-4"
    >
      <HiPencil />
    </Link>
  );
};
