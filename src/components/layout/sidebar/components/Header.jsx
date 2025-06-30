import { ChevronsUpDown } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="m-1 p-1 rounded-md flex items-center gap-2 hover:bg-[#28292c] cursor-pointer select-none">
      <div className="size-12 select-none rounded-md bg-purple-400 flex justify-center items-center font-medium text-4xl">
        <span>S</span>
      </div>
      <div>
        <h1 className="text-xl ">Collaburate</h1>
        <span className="text-xs">Sahil's WorkSpace</span>
      </div>
      <div className="flex items-center">
        <ChevronsUpDown />
      </div>
    </div>
  );
}
