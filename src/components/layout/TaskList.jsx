import React from "react";
import Task from "../Task";

export default function TaskList({
  title,
  label,
  tasks,
  handleDrop,
  handleDeleteTask,
  handleDragOver,
}) {
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);
  }

  function sortByCreatedDate(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  function renderTask(task) {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        label={task.label}
        priority={task.priority}
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
        handleDeleteTask={handleDeleteTask}
        handleDragStart={handleDragStart}
      />
    );
  }

  const sortedTasks = [...tasks].sort(sortByCreatedDate);

  return (
    <section
      data-label={label}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-white dark:bg-[#121316] flex-1 h-[737px] w-full rounded-lg shadow-lg flex flex-col overflow-hidden"
    >
      <h2 className="dark:text-white text-center py-2 font-bold">{title}</h2>
      <div className="flex-1 h-full overflow-y-auto">
        {sortedTasks.map(renderTask)}
      </div>
      <footer className="dark:text-white py-2 text-center cursor-pointer hover:bg-[#1A1B1E]">
        + Create Task
      </footer>
    </section>
  );
}
