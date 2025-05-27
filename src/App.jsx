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
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const { showToast } = useContext(toasterContext);

  const handleDrop = (_, newLabel) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId ? { ...task, label: newLabel } : task
      )
    );
    const task = tasks.find((task) => task.id === draggedTaskId);
    showToast(`${task.title} moved to ${LABELS[newLabel]}`, "success");
    setDraggedTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    showToast("Task deleted successfully", "success");
  };

  return (
    <div className="w-screen h-screen bg-[#f4fbf9] dark:bg-black p-2">
      <Toast />
      {showForm && <CreateTaskForm setShowForm={setShowForm} />}
      <div className="size-full flex flex-col items-end">
        <CreateTaskBtn label="Create Task" onClick={() => setShowForm(true)} />
        <div className="flex-1 flex gap-2  justify-between w-full">
          {Object.keys(LABELS).map((label) => (
            <TaskList
              key={label}
              label={label}
              title={LABELS[label]}
              tasks={tasks.filter((task) => task.label === label)}
              setDraggedTaskId={setDraggedTaskId}
              handleDrop={handleDrop}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
