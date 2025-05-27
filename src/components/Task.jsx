import React from "react";
import { CalendarDays, Clock, Trash } from "lucide-react"; // Optional icons (you can swap these)
import { LABELS, PRIORITIES } from "../data/constants";

export default function Task({
  id,
  title,
  description,
  label,
  priority,
  createdAt,
  updatedAt,
  setDraggedTaskId,
  handleDeleteTask,
}) {
  const getPriorityColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-black";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      className="group justify-between flex cursor-grab select-none m-2 bg-white dark:bg-gray-900 rounded-md p-5 shadow-md hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>
      </div>

      {/* Trash button only visible on hover */}
      <button
        className="cursor-pointer text-red-600 hover:text-red-800  group-hover:block transition"
        onClick={() => handleDeleteTask(id)} // Replace with actual delete handler
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
