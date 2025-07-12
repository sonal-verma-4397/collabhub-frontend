import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LocalStorageContext from "../../../../../../context/LocalStorage";
import { createAndValidate } from "../../../../../../entities/utils/createAndValidate";
import { ModuleSchema } from "../../../../../../entities/schema/module.schema";
import { PageSchema } from "../../../../../../entities/schema/page.schema";

/**
 * Custom hook that encapsulates all logic for a navigation item,
 * including state management for menu, renaming, context actions, etc.
 */
export default function useIndex(item) {
  /* ----------------------------------
   * External hooks & context
   * ---------------------------------- */
  const params = useParams();
  const { modules, setModules, setWorkspaces, setPages, setTasks } =
    useContext(LocalStorageContext);

  /* ----------------------------------
   * State management
   * ---------------------------------- */
  const [showChildren, setShowChildren] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);

  const hasChildren = item.children && item.children.length > 0;
  const Component = item.path ? Link : "button";

  /* ----------------------------------
   * Effects
   * ---------------------------------- */
  useEffect(() => {
    function handleClickOutside() {
      setShowMenu(false);
    }

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  /* ----------------------------------
   * Handlers
   * ---------------------------------- */

  // Handles add-module / add-page button clicks
  function handleComponentClick(elemId) {
    return (e) => {
      e.stopPropagation();

      switch (true) {
        case e.target.id === "add-module": {
          const newModule = createAndValidate(ModuleSchema, (mod) => {
            mod.name = "new module";
            return mod;
          });

          setWorkspaces((prev) =>
            prev.map((ws) =>
              ws.id === params.workspaceId
                ? { ...ws, modulesIds: [...ws.modulesIds, newModule.id] }
                : ws
            )
          );

          setModules((prev) => [newModule, ...prev]);
          break;
        }

        case e.target.id === "add-page": {
          const newPage = createAndValidate(PageSchema, (page) => {
            page.name = "new page";
            return page;
          });

          const moduleId = elemId?.split("_")[0];

          setModules((prev) =>
            prev.map((mod) =>
              mod.id === moduleId
                ? { ...mod, pages: [...mod.pages, newPage.id] }
                : mod
            )
          );

          setPages((prev) => [newPage, ...prev]);
          break;
        }

        default: {
          setShowChildren((prev) => !prev);
          break;
        }
      }
    };
  }

  // Double click to rename module
  function handleDoubleClick(item) {
    return (e) => {
      e.stopPropagation();
      if (item.ariaLabel === "module" || item.ariaLabel === "page") {
        setIsEditing(true);
      }
    };
  }

  // Context menu trigger (right-click)
  function handleContextMenuClick(item) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (item.ariaLabel === "module" || item.ariaLabel === "page") {
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowMenu(true);
      }
    };
  }

  // Rename submit handler
  function handleRenameSubmit(e) {
    e.preventDefault();
    if (!editName.trim()) return;

    setModules((prev) =>
      prev.map((mod) =>
        mod.id === item.id ? { ...mod, name: editName.trim() } : mod
      )
    );

    setPages((prev) =>
      prev.map((page) =>
        page.id === item.id ? { ...page, name: editName.trim() } : page
      )
    );

    setIsEditing(false);
  }

  // Handle pressing enter in rename input
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleRenameSubmit(e);
    }
  }

  // Delete module and its children
  function handleDelete({ id, ariaLabel }) {
    return () => {
      if (ariaLabel === "module") {
        const moduleToBeDeleted = modules.find((mod) => mod.id === id);
        if (!moduleToBeDeleted) return;

        setPages((pages) =>
          pages.filter((page) => !moduleToBeDeleted.pages.includes(page.id))
        );

        setTasks((tasks) =>
          tasks.filter((task) => !moduleToBeDeleted.tasks.includes(task.id))
        );

        setModules((mods) =>
          mods.filter((mod) => mod.id !== moduleToBeDeleted.id)
        );
      }

      if (ariaLabel === "page") {
        setPages((pages) => pages.filter((page) => page.id !== id));
      }
    };
  }

  /* ----------------------------------
   * Return hook API
   * ---------------------------------- */
  return {
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
  };
}
