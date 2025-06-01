import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import React from "react";
import { useLocation } from "react-router";
import { navItems } from "../../data/navItems";
import { filterByPathname } from "./Sidebar";

export default function Header({ open, setOpen }) {
  function toggleSidebar() {
    setOpen(!open);
  }
  return (
    <div className="h-fit flex items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-[#202124] rounded-md"
      >
        {open ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
      <h1 className="text-2xl font-semibold">
        {navItems.filter(filterByPathname)[0].label}
      </h1>
    </div>
  );
}
