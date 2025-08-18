import { useContext, useState } from "react";
import LocalStorageContext from "../../../../context/LocalStorage";
import { Plus } from "lucide-react";
import WorkspaceCard from "../workspace-card";
import CreateWorkspaceForm from "../create-workspace";

// -------------------- WORKSPACES SECTION ---------------------
export default function Workspaces() {
  const { workspaces, setWorkspaces, modules, setModules, setPages, setTasks } =
    useContext(LocalStorageContext);
  const [showForm, setShowForm] = useState(false);

  const handleCreateWorkspace = (newWorkspace) => {
    setWorkspaces((prev) => [...prev, newWorkspace]);
    setShowForm(false);
  };

  const handleDeleteWorkspace = (id) => () => {
    // Get all module IDs inside the workspace
    const modulesIdToBeDelete =
      workspaces.find((ws) => ws.id === id)?.modulesIds || [];

    // Get all modules that will be deleted
    const modulesToBeDelete = modules.filter((module) =>
      modulesIdToBeDelete.includes(module.id)
    );

    // Collect all page IDs to be deleted
    const pagesIdToBeDelete = modulesToBeDelete.flatMap((mod) => mod.pages);

    // Collect all task IDs to be deleted
    const tasksIdToBeDelete = modulesToBeDelete.flatMap((mod) => mod.tasks);

    // Delete pages by their ID
    setPages((prev) =>
      prev.filter((page) => !pagesIdToBeDelete.includes(page.id))
    );

    // Delete tasks by their ID
    setTasks((prev) =>
      prev.filter((task) => !tasksIdToBeDelete.includes(task.id))
    );

    // Delete modules by their ID
    setModules((prev) =>
      prev.filter((mod) => !modulesIdToBeDelete.includes(mod.id))
    );

    // Finally, delete the workspace
    setWorkspaces((prev) => prev.filter((ws) => ws.id !== id));
  };

  const handleEditWorkspace = (id) => () => {
    console.log(id);
    // const workspaceToBeEdited = workspaces.find((ws) => ws.id === id);
    setShowForm(true);
  };

  return (
    <section className="w-[70%] mx-auto">
      <div className="min-h-screen px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Workspaces</h2>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
          >
            <Plus size={16} /> New Workspace
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              ws={ws}
              handleDelete={handleDeleteWorkspace}
              handleEdit={handleEditWorkspace}
            />
          ))}

          {workspaces.length === 0 && (
            <div className="text-sm text-gray-400">
              No workspaces found. Create a new workspace to get started.
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <CreateWorkspaceForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateWorkspace}
        />
      )}
    </section>
  );
}
