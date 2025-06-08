import React, { useContext, useState } from "react";
import { LABELS } from "../../data/constants";
import TaskList from "./components/TaskList";
import { Plus } from "lucide-react";
import CreateLabelForm from "../../components/form/CreateLabelForm";
import LocalStorageContext from "../../context/LocalStorage";
import { toasterContext } from "../../context/Toaster";

export default function Page() {
  const { showToast } = useContext(toasterContext);
  const { labels, tasks, setTasks } = useContext(LocalStorageContext);

  const [labelFormState, setLabelFormState] = useState("");

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

  const handleDeleteTask = (e) => {
    const taskId = e.currentTarget.dataset.id;
    const filterByCurrentTaskId = (task) => task.id !== taskId;
    setTasks((prev) => prev.filter(filterByCurrentTaskId));
    showToast("Task deleted successfully", "success");
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
        handleDeleteTask={handleDeleteTask}
        labelFormState={labelFormState}
        setLabelFormState={setLabelFormState}
      />
    );
  }

  return (
    <div className="flex gap-2 w-[1456px] h-[760px] overflow-auto ">
      {labels.map(renderTaskList)}
      <span
        onClick={() => setLabelFormState("new")}
        className="dark:bg-[#262c36] h-fit p-2 rounded-lg cursor-pointer"
      >
        <Plus />
      </span>

      {labelFormState == "new" && (
        <CreateLabelForm
          labelFormState={labelFormState}
          setLabelFormState={setLabelFormState}
        />
      )}
    </div>
  );
}
