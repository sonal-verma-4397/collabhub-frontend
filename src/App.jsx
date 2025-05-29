import React, { useContext, useState } from "react";
import { CreateTaskBtn } from "./components/ui/Button";
import CreateTaskForm from "./components/layout/CreateTaskForm";
import TaskList from "./components/layout/TaskList";
import { LABELS } from "./data/constants";
import { Toast } from "./components/layout/Toast.jsx";
import { taskContext } from "./context/Task.js";
import { toasterContext } from "./context/Toaster.js";

export default function App() {
  const { tasks, setTasks } = useContext(taskContext);
  const [showForm, setShowForm] = useState(false);
  const { showToast } = useContext(toasterContext);

  const handleDrop = (e) => {
    const newLabel = e.currentTarget.dataset.label;
    const draggedTaskId = e.dataTransfer.getData("text/plain");
    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId ? { ...task, label: newLabel } : task
      )
    );
    const task = tasks.find((task) => task.id === draggedTaskId);
    showToast(`${task.title} moved to ${LABELS[newLabel]}`, "success");
  };

  const handleDeleteTask = (e) => {
    const taskId = e.currentTarget.dataset.id;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    showToast("Task deleted successfully", "success");
  };

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleFormOpen() {
    setShowForm(true);
  }

  function labelFilter(label) {
    return tasks.filter((task) => task.label === label);
  }

  function renderTaskList(label) {
    return (
      <TaskList
        key={label}
        label={label}
        title={LABELS[label]}
        tasks={labelFilter(label)}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDeleteTask={handleDeleteTask}
        handleFormOpen={handleFormOpen}
      />
    );
  }
  return (
    <div className="w-screen h-screen bg-[#f4fbf9] dark:bg-black p-2">
      <Toast />
      {showForm && <CreateTaskForm setShowForm={setShowForm} />}
      <div className="size-full flex flex-col items-end">
        <div className="flex-1 flex gap-2  justify-between w-full">
          {Object.keys(LABELS).map(renderTaskList)}
        </div>
      </div>
    </div>
  );
}
