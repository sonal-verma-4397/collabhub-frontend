import React, { useContext } from "react";
import { LABELS } from "../data/constants";
import TaskList from "../components/layout/TaskList";
import { taskContext } from "../context/Task";
import { toasterContext } from "../context/Toaster";

export default function MyTasks() {
  const { tasks, setTasks } = useContext(taskContext);
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
      />
    );
  }
  return (
    <div className="flex-1 flex gap-2 h-[760px] justify-between w-full">
      {Object.keys(LABELS).map(renderTaskList)}
    </div>
  );
}
