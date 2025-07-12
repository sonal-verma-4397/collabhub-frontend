import React, { useState } from "react";
import { Toast } from "./components/layout/Toast.jsx";
import { fallbackNavItems, navItems } from "./data/navItems.js";
import Header from "./components/layout/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/layout/sidebar/index.jsx";
import { createAndValidate } from "./entities/utils/createAndValidate.js";
import { ModuleSchema } from "./entities/schema/module.schema.js";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex gap-1 w-screen h-screen overflow-hidden bg-[#f4fbf9] dark:bg-black  dark:text-white">
      <Toast />
      <Sidebar />
      <main className="size-full flex flex-col gap-1   flex-1 rounded-lg overflow-y-auto">
        <Header setOpen={setShowSidebar} open={showSidebar} />
        <Outlet />
      </main>
    </div>
  );
}
