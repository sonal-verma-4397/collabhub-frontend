import { Plus } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="w-full aspect-video dark:bg-[#131416]  flex justify-center items-center rounded-lg shadow-md text-xl cursor-pointer">
        <h1>Module 1</h1>
      </div>

      <div className="w-full aspect-video dark:bg-[#131416]  flex justify-center items-center rounded-lg shadow-md text-xl cursor-pointer">
        <Plus />
      </div>
    </div>
  );
}
