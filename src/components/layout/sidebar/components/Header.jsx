import { ArrowLeft, ChevronsUpDown, Home, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);
  function handleTogglePopup() {
    setShowPopup((prev) => !prev);
  }
  return (
    <div className="relative">
      <button
        onClick={handleTogglePopup}
        className="m-1 p-1 rounded-md flex items-center gap-2 hover:bg-[#28292c] cursor-pointer select-none relative"
      >
        <div className="size-12 select-none rounded-md bg-purple-400 flex justify-center items-center font-medium text-4xl">
          <span className="font-thin">S</span>
        </div>
        <div className="text-left">
          <h1 className="text-xl ">Project Sync</h1>
          <span className="text-xs">Sahil's WorkSpace</span>
        </div>
        <div className="flex items-center">
          <ChevronsUpDown />
        </div>
      </button>
      {showPopup && <Popup />}
    </div>
  );
}

function Popup() {
  return (
    <div className="absolute top-2 left-[105%] z-30 w-64 dark:text-white dark:bg-[#131416] p-3 shadow-xl rounded-xl border border-gray-700 text-left space-y-2">
      {/* Header */}
      <Link
        to={"/user/123"}
        className="flex items-center gap-2 border-b border-gray-700 pb-2 text-sm font-medium text-gray-200"
      >
        <Home size={18} />
        <span>Back To Home</span>
      </Link>

      {/* Workspaces Section */}
      <div className="text-xs uppercase tracking-wide text-gray-400 pt-1 px-1">
        Workspaces
      </div>

      <div className="space-y-1">
        <div className="cursor-pointer hover:bg-[#28292c] px-2 py-1 rounded-md transition-colors">
          Sahil's Workspace
        </div>
        <div className="cursor-pointer hover:bg-[#28292c] px-2 py-1 rounded-md transition-colors">
          Untitled Workspace
        </div>
      </div>

      {/* New Workspace */}
      <div className="flex items-center gap-2 border-t border-gray-700 pt-2 text-sm text-gray-300 cursor-pointer  px-2 py-1 transition-colors">
        <Plus size={18} />
        <span>New Workspace</span>
      </div>
    </div>
  );
}
