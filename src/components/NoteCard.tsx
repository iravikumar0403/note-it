import { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteNoteById } from "../services";
import { useNotesContext } from "../context";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";
import { toast } from "react-toastify";
import { note } from "../types";
import dayjs from "dayjs";

type noteProps = {
  note: note;
};

export const NoteCard = ({ note }: noteProps) => {
  const { created_at, tags, title, text_content, id } = note;
  const { dispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOnOutsideClick(() => setShowDropdown(false));

  const deleteNote = async () => {
    setIsLoading(true);
    try {
      await deleteNoteById(id);
      dispatch({
        type: "DELETE_NOTE",
        payload: id,
      });
      toast.success("Note deleted");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to delete note");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex relative flex-col shadow border m-2 p-4 w-[20rem] sm:w-[32rem]">
      <Link to={`/notes/view/${id}`} className="text-2xl border-b">
        {title}
      </Link>
      <Link
        to={`/notes/view/${id}`}
        className="text-gray-800 text-justify my-2"
      >
        {text_content.substring(0, 250) + "..."}
      </Link>
      <div className="flex flex-wrap mt-auto">
        {tags.map((tag, index) => (
          <p
            key={index}
            className="rounded-full px-4 py-1 my-2 mr-1 bg-slate-200"
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 ">
          Created at:{" "}
          <span className="text-gray-800">
            {dayjs(created_at).format("DD MMM, YYYY")}
          </span>
        </p>
        <div className="relative" ref={ref}>
          <button
            className={` rounded-full p-4 ${
              showDropdown ? "bg-slate-100" : ""
            }`}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <BsThreeDotsVertical />
          </button>
          {showDropdown && (
            <div className="flex flex-col gap-y-2 w-[10rem] bg-slate-100 px-4 py-2 z-10 rounded absolute right-0">
              <Link
                to={`/notes/edit/${id}`}
                className="btn-primary text-center w-full"
              >
                Edit
              </Link>
              <ButtonWithLoader
                isLoading={isLoading}
                className="btn-primary flex justify-center items-center bg-red-500 text-black hover:bg-red-400 hover:text-black"
                onClick={deleteNote}
              >
                Delete
              </ButtonWithLoader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
