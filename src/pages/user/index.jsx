import React from "react";
import { Plus, FileText, ListTodo, Search } from "lucide-react";
import { Link } from "react-router-dom";
import "../../index.css";

export default function User() {
  const userName = "Sahil"; // make this dynamic later
  const workspaces = [
    { name: "Sahil's Workspace", lastUpdated: "2 days ago" },
    { name: "Untitled Workspace", lastUpdated: "5 hours ago" },
  ];

  const recentActivities = [
    { type: "page", name: "Marketing Plan", time: "1 hour ago" },
    { type: "task", name: "Fix signup bug", time: "3 hours ago" },
  ];

  return (
    <main className="bg-[#0f0f0f] text-white">
      <header className="px-[15vw] py-2">
        <Link to={"/"} className="text-2xl font-bold">Project Sync</Link>
      </header>
      <section className="w-[70%] mx-auto ">
        <div className="w-fit mx-auto text-6xl py-6">
          <h2 className="text-center">🌄Good Morning </h2>
          <h3 className="text-center">Hello, Sahil👋</h3>
        </div>
      </section>
      <section className="w-[70%] mx-auto py-6">
        <div className="flex items-center gap-2 w-fit mx-auto">
          <Search size={32} />
          <input className="outline-none text-2xl" type="text" placeholder="Search your workspaces" />
        </div>
      </section>
      <section className="w-[70%] mx-auto">
        <div className="min-h-screen px-6 py-6 ">
          {/* Workspaces */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Your Workspaces</h2>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1f1f1f] hover:bg-[#2b2b2b] border border-gray-700 text-sm">
              <Plus size={16} /> New Workspace
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws, i) => (
              <Link
                to={`/workspaces/${i}`}
                key={i}
                className="p-4 rounded-lg border border-gray-700 bg-[#1a1a1a] hover:bg-[#242424] transition-colors"
              >
                <div className="text-xl font-medium mb-1">{ws.name}</div>
                <div className="text-sm text-gray-400">
                  Last updated: {ws.lastUpdated}
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-gray-700 rounded-md hover:bg-[#242424] transition-colors"
                >
                  {item.type === "page" ? (
                    <FileText size={20} className="text-blue-400" />
                  ) : (
                    <ListTodo size={20} className="text-green-400" />
                  )}
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
