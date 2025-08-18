import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import LocalStorageContext from "../../../../../context/LocalStorage";
import { createAndValidate } from "../../../../../entities/utils/createAndValidate";
import { ModuleSchema } from "../../../../../entities/schema/module.schema";
import { PageSchema } from "../../../../../entities/schema/page.schema";
import Menu from "../../../../utility/Menu";
import ContextMenu from "../../../../context-menu";
import { Input } from "../../../../ui/html-tags";
import useIndex from "./hooks/useIndex";
import Text from "../../../../ui/Text";

export default function NavItem({ item, depth }) {
  const {
    showChildren,
    showMenu,
    contextMenuPosition,
    isEditing,
    editName,
    hasChildren,
    Component,

    setShowChildren,
    setShowMenu,
    setContextMenuPosition,
    setIsEditing,
    setEditName,
    handleComponentClick,
    handleDoubleClick,
    handleContextMenuClick,
    handleRenameSubmit,
    handleKeyDown,
    handleDelete,
    handleRename,
  } = useIndex(item);

  return (
    <div className="space-y-1" title={item.name} aria-label={item.name}>
      <Component
        id={item.id}
        to={item.path}
        onClick={handleComponentClick(item.id)}
        onDoubleClick={handleDoubleClick(item)}
        onContextMenu={handleContextMenuClick(item)}
        className={`flex items-center gap-2 p-1 hover:bg-[#28292c] rounded-md cursor-pointer w-full justify-between`}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon size={18} />}

          {isEditing ? (
            <Input
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleRenameSubmit}
              onFocus={(e) => e.target.select()}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-b border-gray-600 outline-none text-white text-sm block w-fit"
            />
          ) : (
            <Text>{item.name}</Text>
          )}

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

      {showMenu && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setShowMenu(false)}
          onDelete={handleDelete(item)}
          onRename={handleRename()}
        />
      )}
    </div>
  );
}
