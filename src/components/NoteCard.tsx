import React from "react";
import dayjs from "dayjs";
import { note } from "../types/notes.types";

type noteProps = {
  note: note;
};

export const NoteCard = ({ note }: noteProps) => {
  const { id, created_at, tags, title } = note;
  return (
    <div className="shadow border m-2 p-4 min-w-[16rem]">
      <p className="text-2xl">{title}</p>
      <p className="text-gray-500  mt-auto">
        Created at:{" "}
        <span className="text-gray-800">
          {dayjs(created_at).format("DD MMM, YYYY")}
        </span>
      </p>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <p key={id} className="rounded-full px-4 py-1 my-2 bg-slate-200">
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};
