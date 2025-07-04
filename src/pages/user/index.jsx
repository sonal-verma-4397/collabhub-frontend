// TODO : Refactore

import React, { useContext, useState, useRef, useEffect } from "react";
import { Plus, Search, Ellipsis } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import LocalStorageContext from "../../context/LocalStorage";
import { createAndValidate } from "../../entities/utils/createEntity";
import { WorkspaceSchema } from "../../entities/schema/workspace.schema";
import { APP_NAME } from "../../data/constants";

// -------------------- MAIN USER COMPONENT ---------------------
export default function User() {
  return (
    <main className="bg-[#0f0f0f] text-white">
      <Header />
      <WelcomMessage />
      <SearchWorkspace />
      <Workspaces />
    </main>
  );
}

// -------------------- HEADER ---------------------
function Header() {
  return (
    <header className="px-[15vw] py-2">
      <Link to={"/"} className="text-2xl font-bold">
        {APP_NAME}
      </Link>
    </header>
  );
}

// -------------------- GREETING ---------------------
function WelcomMessage() {
  return (
    <section className="w-[70%] mx-auto ">
      <div className="w-fit mx-auto text-6xl py-6">
        <h2 className="text-center">🌄Good Morning</h2>
        <h3 className="text-center">Hello, Sahil👋</h3>
      </div>
    </section>
  );
}

// -------------------- SEARCH ---------------------
function SearchWorkspace() {
  return (
    <section className="w-[70%] mx-auto py-6">
      <div className="flex items-center gap-2 w-fit mx-auto border-b border-gray-600">
        <Search size={24} />
        <input
          className="outline-none text-lg bg-transparent placeholder-gray-400"
          type="text"
          placeholder="Search your workspaces"
        />
      </div>
    </section>
  );
}

// -------------------- WORKSPACES SECTION ---------------------
function Workspaces() {
  const { workspaces, setWorkspaces } = useContext(LocalStorageContext);
  const [showForm, setShowForm] = useState(false);

  const handleCreateWorkspace = (data) => {
    const newWorkspace = createAndValidate(WorkspaceSchema, data);
    setWorkspaces((prev) => [...prev, newWorkspace]);
    setShowForm(false);
  };

  const handleDeleteWorkspace = (id) => () => {
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

// -------------------- WORKSPACE CARD ---------------------
function WorkspaceCard({ ws, handleDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/workspaces/${ws.id}`);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative p-4 rounded-lg border border-gray-700 bg-[#1a1a1a] hover:bg-[#242424] transition-colors flex justify-between items-start"
    >
      <div>
        <div className="text-xl font-medium mb-1">{ws.name}</div>
        <div className="text-sm text-gray-400">{ws.description}</div>
      </div>

      <button onClick={handleMenuToggle} className="ml-2">
        <Ellipsis className="text-gray-400 hover:text-white" />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-4 top-12 bg-[#2a2a2a] border border-gray-600 rounded-md shadow-lg z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDelete(ws.id)}
            className="px-4 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] w-full text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------- CREATE WORKSPACE FORM ---------------------
function CreateWorkspaceForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(formData);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] text-white p-6 rounded-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Workspace</h2>

        <label className="block mb-2 text-sm">
          Name
          <input
            type="text"
            name="name"
            className="mt-1 w-full px-3 py-2 rounded-md bg-[#2a2a2a] border border-gray-600 outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4 text-sm">
          Description
          <textarea
            name="description"
            rows="3"
            className="mt-1 w-full px-3 py-2 rounded-md bg-[#2a2a2a] border border-gray-600 outline-none resize-none"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-600 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-green-600 rounded-md hover:bg-green-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
