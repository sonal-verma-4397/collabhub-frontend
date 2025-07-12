import { useContext, useState } from "react";
import LocalStorageContext from "../../../../context/LocalStorage";
import { Plus } from "lucide-react";
import WorkspaceCard from "../workspace-card";
import CreateWorkspaceForm from "../create-workspace";

// -------------------- WORKSPACES SECTION ---------------------
export default function Workspaces() {
  const { workspaces, setWorkspaces, setModules, setPages, setTasks } =
    useContext(LocalStorageContext);
  const [showForm, setShowForm] = useState(false);

  const handleCreateWorkspace = (newWorkspace) => {
    setWorkspaces((prev) => [...prev, newWorkspace]);
    setShowForm(false);
  };

  const handleDeleteWorkspace = (id) => () => {
    const modulesToBeDelete = workspaces.find((ws) => ws.id === id).modulesIds;
    setModules((prev) =>
      prev.filter((mod) => !modulesToBeDelete.includes(mod.id))
    );
    setPages((prev) =>
      prev.filter((page) => !modulesToBeDelete.includes(page.moduleId))
    );
    setTasks((prev) =>
      prev.filter((task) => !modulesToBeDelete.includes(task.pageId))
    );
    setWorkspaces((prev) => prev.filter((ws) => ws.id !== id));
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
