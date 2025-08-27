import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/layout/sidebar/index.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex gap-1 w-screen h-screen overflow-hidden bg-[#f4fbf9] dark:bg-black  dark:text-white">
      <Toaster />
      <Sidebar />
      <main className="size-full flex flex-col gap-1   flex-1 rounded-lg overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
