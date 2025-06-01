import React, { useContext, useState } from "react";
import { CreateTaskBtn } from "./components/ui/Button";
import CreateTaskForm from "./components/form/CreateTaskForm.jsx";
import TaskList from "./components/layout/TaskList";
import { LABELS } from "./data/constants";
import { Toast } from "./components/layout/Toast.jsx";
import { taskContext } from "./context/Task.js";
import { toasterContext } from "./context/Toaster.js";
import { fallbackNavItems, navItems } from "./data/navItems.js";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import MyTasks from "./pages/MyTasks.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex gap-2 w-screen h-screen bg-[#f4fbf9] dark:bg-black p-2 dark:text-white">
      <Toast />
      <Sidebar
        open={showSidebar}
        navItems={navItems}
        fallbackNavItems={fallbackNavItems}
      />
      <main className="size-full flex flex-col  flex-1 rounded-lg ">
        <Header setOpen={setShowSidebar} open={showSidebar} />
        <Outlet />
      </main>
    </div>
  );
}
