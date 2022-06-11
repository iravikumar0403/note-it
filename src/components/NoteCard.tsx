import React from "react";
import dayjs from "dayjs";
import { note } from "../types/notes.types";
import { Link } from "react-router-dom";

type noteProps = {
  note: note;
};

export const NoteCard = ({ note }: noteProps) => {
  const { created_at, tags, title, text_content, id } = note;
  return (
    <Link
      to={`/notes/view/${id}`}
      className="flex flex-col shadow border m-2 p-4 w-[20rem] sm:w-[32rem]"
    >
      <p className="text-2xl border-b">{title}</p>
      <p className="text-gray-800 text-justify my-2">
        {text_content.substring(0, 250) + "..."}
      </p>
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
      <p className="text-gray-500 ">
        Created at:{" "}
        <span className="text-gray-800">
          {dayjs(created_at).format("DD MMM, YYYY")}
        </span>
      </p>
    </Link>
  );
};
