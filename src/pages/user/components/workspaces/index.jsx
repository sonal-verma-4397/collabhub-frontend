import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../../../../context/LocalStorage";
import { Plus } from "lucide-react";
import WorkspaceCard from "../workspace-card";
import CreateWorkspaceForm from "../create-workspace";
import { data } from "react-router-dom";

export default function Workspaces() {
  const { workspaces, setWorkspaces, modules, setModules, setPages, setTasks } =
    useContext(LocalStorageContext);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState(null)

  // GET workspaces
  async function userWorkspaces() {
    const res = await fetch("http://localhost:8000/workspaces", {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const resData = await res.json();
    console.log(resData.data)
    setWorkspaces(resData.data);
  }

  // POST workspace
  async function createWorkspaces(workspaceData) {
    const res = await fetch("http://localhost:8000/workspaces/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workspaceData),
    });

    const resData = await res.json();

    if (res.ok) {
      // userWorkspaces(); // refresh list
      setShowForm(false);
    } else {
      console.log(resData.message);
    }
  }
  async function UpdateWorkspace(workspaceId, workspaceData) {
    console.log(workspaceId,workspaceData)
    const res = await fetch(`http://localhost:8000/workspaces/${workspaceId}`,
      {
        method: 'put',
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workspaceData)
      }
    );
    const resData = await res.json()
    if (res.ok) {
      setWorkspaces((prev) => prev.map((ws) => ws._id === workspaceId ? resData?.data : ws))
      setShowForm(false)
      setEditingWorkspace(null);
    }
    
  }

  async function DeleteWorkspaces(workspaceId) {
    const res = await fetch(`http://localhost:8000/workspaces/${workspaceId}`,
      {
        method: 'DELETE',
        credentials: "include"
      }
    )
    const resData = await res.json()
    return { ok: res.ok, data: resData }
  }

  const handleDeleteWorkspace = (id) => async () => {
    const { ok, data } = await DeleteWorkspaces(id)

    const modulesIdToBeDelete =
      workspaces.find((ws) => ws.id === id)?.modulesIds || [];

    const modulesToBeDelete = modules.filter((module) =>
      modulesIdToBeDelete.includes(module.id)
    );

    const pagesIdToBeDelete = modulesToBeDelete.flatMap((mod) => mod.pages);
    const tasksIdToBeDelete = modulesToBeDelete.flatMap((mod) => mod.tasks);

    setPages((prev) => prev.filter((page) => !pagesIdToBeDelete.includes(page.id)));
    setTasks((prev) => prev.filter((task) => !tasksIdToBeDelete.includes(task.id)));
    setModules((prev) => prev.filter((mod) => !modulesIdToBeDelete.includes(mod.id)));
    setWorkspaces((prev) => prev.filter((ws) => ws._id !== id));
  };

  const handleEditWorkspace = (workspace) => () => {
    setEditingWorkspace(workspace)
    setShowForm(true);
  };

  useEffect(() => {
    userWorkspaces();
  }, []);

  return (
    <section className="w-[70%] mx-auto">
      <div className="min-h-screen px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Workspaces</h2>
          <button
            type="button"
            onClick={() => { setEditingWorkspace(null); setShowForm(true) }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm"
          >
            <Plus size={16} /> New Workspace
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws._id}
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
          onClose={() => { setShowForm(false); setEditingWorkspace(null) }}
          onSubmit={(ws) => editingWorkspace ? UpdateWorkspace(editingWorkspace._id, ws) : createWorkspaces(ws)} // ✅ direct backend call
          initialData={editingWorkspace} />
      )}
    </section>
  );
}
