import React, { useContext, useState } from "react";
import { LABELS } from "../../data/constants";
import { Plus } from "lucide-react";
import { toasterContext } from "../../context/Toaster";
import TaskList from "./components/TaskList";
import LabelForm from "../../components/form/LabelForm";
import LocalStorageContext from "../../context/LocalStorage";

export default function Page() {
  const { showToast } = useContext(toasterContext);
  const { labels, tasks, setTasks } = useContext(LocalStorageContext);
  const [showLabelForm, setShowLabelForm] = useState(false);

  const handleDrop = (e) => {
    const newLabel = e.currentTarget.dataset.label;
    const draggedTaskId = e.dataTransfer.getData("text/plain");

    const mapToUpdatedLabel = (task) =>
      task.id === draggedTaskId ? { ...task, label: newLabel } : task;
    setTasks((prev) => prev.map(mapToUpdatedLabel));

    const findByDraggedTaskId = (task) => task.id === draggedTaskId;
    const task = tasks.find(findByDraggedTaskId);
    showToast(`${task.title} moved to ${LABELS[newLabel].title}`, "success");
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  const filterByLabel = (label) => tasks.filter((task) => task.label === label);

  function renderTaskList(label) {
    return (
      <TaskList
        key={label.id}
        label={label}
        tasks={filterByLabel(label.title)}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
      />
    );
  }

  return (
    <div className="flex gap-2 w-[1456px] overflow-auto ">
      {labels.map(renderTaskList)}
      <span
        onClick={() => setShowLabelForm(true)}
        className="dark:bg-[#262c36] h-fit p-2 rounded-lg cursor-pointer"
      >
        <Plus />
      </span>

      {showLabelForm && <LabelForm closeForm={() => setShowLabelForm(false)} />}
    </div>
  );
}
