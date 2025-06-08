import React from "react";
import { CalendarDays, Clock, Trash } from "lucide-react"; // Optional icons (you can swap these)

export default function Task({
  id,
  title,
  description,
  label,
  priority,
  createdAt,
  updatedAt,
  handleDeleteTask,
  handleDragStart,
}) {

  return (
    <div
      data-id={id}
      draggable
      onDragStart={handleDragStart}
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

      <button
        data-id={id}
        className="cursor-pointer text-red-600 hover:text-red-800  group-hover:block transition"
        onClick={handleDeleteTask}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
