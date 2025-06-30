import { ChevronsUpDown } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="m-1 p-1 rounded-md flex items-center gap-2 hover:bg-[#28292c] cursor-pointer select-none">
      <div className="size-12 select-none rounded-full flex justify-center items-center font-thin text-4xl">
        <span>S</span>
      </div>
      <div>
        <h1 className="text-xl ">Sahil Verma</h1>
        <span className="text-xs">sahil@gmail.com</span>
      </div>
      <div className="flex items-center">
        <ChevronsUpDown />
      </div>
    </div>
  );
}
