import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { generateDynamicSidebarConfig } from "../config";

export default function NavItem({ item, depth }) {
  const [showChildren, setShowChildren] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const Component = item.path ? Link : "button";


  function handleClick(e) {
    e.stopPropagation();
    if (e.target.id === "add-module") {
      alert("add module");
      // setShowCreateModulePopup(true);
    } else {
      setShowChildren(!showChildren);
    }
  }

  return (
    <div className="space-y-1" title={item.label} aria-label={item.label}>
      <Component
        to={item.path}
        onClick={handleClick}
        className={`flex items-center gap-2 p-1 hover:bg-[#28292c] rounded-md cursor-pointer w-full justify-between`}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon size={18} />}
          <span>{item.label}</span>
          {!item.path && (
            <span>
              {showChildren ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
        </span>

        {item.label === "Modules" && (
          <span
            id={item.label === "Modules" && "add-module"}
            className="p-1 hover:bg-[#0f0f0f] rounded-md bg-[#202124]"
          >
            <Plus className="pointer-events-none" size={16} />
          </span>
        )}
      </Component>

      {showChildren && hasChildren && (
        <div className="pl-2 border-gray-600 ">
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
