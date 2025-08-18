import React, { useContext } from "react";
import { TaskPreviewContext } from "../../../context/TaskPreview";
import { X } from "lucide-react";

export default function TaskPreview() {
  const { taskPreview, setTaskPreview } = useContext(TaskPreviewContext);
  const { title, description, status, labels, createdAt, updatedAt } =
    taskPreview || {};

  return (
    <div className="fixed top-0 right-0 z-50 w-[50vw] h-screen bg-white dark:bg-zinc-900 text-black dark:text-white shadow-2xl border-l border-gray-300 dark:border-zinc-700">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-zinc-700">
        <h2 className="text-2xl font-semibold truncate">
          {title || "Untitled Task"}
        </h2>
        <button
          onClick={() => setTaskPreview(null)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-64px)] space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase">
            Description
          </h3>
          <p className="text-base">
            {description || "No description provided."}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-sm font-medium text-gray-500 uppercase">
            Status
          </h3>
          <span className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm">
            {status || "No status"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Labels</h3>
          {labels.length > 0
            ? labels.map((label) => (
                <div className="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm">
                  {label.title}
                </div>
              ))
            : "No label"}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-8 border-t pt-4 border-gray-300 dark:border-zinc-700">
          <p>
            Created: {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
          </p>
          <p>
            Updated: {updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
