import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { generateDynamicSidebarConfig } from "../config";
import LocalStorageContext from "../../../../context/LocalStorage";
import {
  createAndValidate,
  createEntity,
} from "../../../../entities/utils/createEntity";
import { ModuleSchema } from "../../../../entities/schema/module.schema";
import { PageSchema } from "../../../../entities/schema/page.schema";

export default function NavItem({ item, depth }) {
  const [showChildren, setShowChildren] = useState(false);
  const [selectedModId, setSelectedModId] = useState("");
  const { setModules, setWorkspaces, setPages } =
    useContext(LocalStorageContext);
  const params = useParams();

  const hasChildren = item.children && item.children.length > 0;
  const Component = item.path ? Link : "button";

  function handleClick(elemId) {
    return (e) => {
      e.stopPropagation();
      switch (true) {
        case e.target.id === "add-module": {
          // Block for add-module
          const newModule = createEntity(ModuleSchema);
          newModule.name = "new module";
          const validedModule = createAndValidate(ModuleSchema, newModule);

          console.log(validedModule);

          setWorkspaces((prev) =>
            prev.map((ws) => {
              if (ws.id === params.workspaceId) {
                return {
                  ...ws,
                  modulesIds: [...ws.modulesIds, validedModule.id],
                };
              }
              return ws;
            })
          );

          setModules((prev) => [...prev, validedModule]);
          break;
        }

        case e.target.id === "add-page": {
          // Block for add-page
          const newPage = createEntity(PageSchema);
          newPage.name = "new page";
          const validPage = createAndValidate(PageSchema, newPage);

          const moduleId = elemId?.split("_")[0];

          setModules((prev) =>
            prev.map((mod) => {
              if (mod.id === moduleId) {
                return {
                  ...mod,
                  pages: [...mod.pages, validPage.id],
                };
              }
              return mod;
            })
          );

          setPages((prev) => [...prev, validPage]);
          console.log("Add Page clicked");
          break;
        }

        default: {
          setShowChildren(!showChildren);
          break;
        }
      }
    };
  }

  return (
    <div className="space-y-1" title={item.name} aria-label={item.name}>
      <Component
        id={item.id}
        to={item.path}
        onClick={handleClick(item.id)}
        className={`flex items-center gap-2 p-1 hover:bg-[#28292c] rounded-md cursor-pointer w-full justify-between`}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon size={18} />}
          <span>{item.name}</span>
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

        {(item.name === "Modules" || item.name === "Pages") && (
          <span
            id={`${(item.name === "Modules" && "add-module") || "add-page"}`}
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
