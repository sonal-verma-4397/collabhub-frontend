import React from "react";
import Task from "../Task";

export default function TaskList({
  title,
  label,
  tasks,
  setDraggedTaskId,
  handleDrop,
  handleDeleteTask,
}) {
  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, label)}
      className="bg-white dark:bg-[#121316] flex-1 h-[737px] w-full rounded-lg shadow-lg  flex flex-col overflow-hidden"
    >
      <h2 className="dark:text-white text-center py-2 font-bold">{title}</h2>
      <div className="flex-1 h-full overflow-y-auto">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            label={task.label}
            priority={task.priority}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
            setDraggedTaskId={setDraggedTaskId}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <footer className="dark:text-white py-2 text-center cursor-pointer hover:bg-[#1A1B1E]">
        + Create Task
      </footer>
    </section>
  );
}
