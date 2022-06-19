import React from "react";
import empty_illustration from "../assets/images/empty.svg";

export const NothingHere = () => {
  return (
    <div className=" text-center">
      <img
        className="mx-auto w-[50%] max-w-[12rem] my-12"
        src={empty_illustration}
        alt="nothing_here"
      />
      <p className="text-slate-600">There's nothing here</p>
    </div>
  );
};
