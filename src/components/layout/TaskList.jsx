import React, { useState } from "react";
import Task from "../Task";
import CreateTaskForm from "../form/CreateTaskForm";

export default function TaskList({
  title,
  label,
  tasks,
  handleDrop,
  handleDeleteTask,
  handleDragOver,
}) {
  const [showForm, setShowForm] = useState(false);

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

  function handleFormOpen() {
    setShowForm(true);
  }

  const sortedTasks = [...tasks].sort(sortByCreatedDate);

  return (
    <>
      <section
        data-label={label}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-white dark:bg-[#121316] flex-1 h-full w-full rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <h2 className="dark:text-white text-center py-2 font-bold">{title}</h2>
        <div className="h-[730px] overflow-y-auto">
          {sortedTasks.map(renderTask)}
        </div>
        <button
          onClick={handleFormOpen}
          className="dark:text-white py-2 text-center cursor-pointer hover:bg-[#1A1B1E]"
        >
          + Create Task
        </button>
      </section>
      {showForm && (
        <CreateTaskForm setShowForm={setShowForm} defaultLabel={label} />
      )}
    </>
  );
}
