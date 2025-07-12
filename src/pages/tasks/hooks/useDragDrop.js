import { useContext } from "react";
import LocalStorageContext from "../../../context/LocalStorage";
import { toasterContext } from "../../../context/Toaster";

export default function useDragDrop() {
  const { showToast } = useContext(toasterContext);
  const { tasks, setTasks } = useContext(LocalStorageContext);

  const handleDrop = (e) => {
    const newStatus = e.currentTarget.dataset.status;
    const draggedTaskId = e.dataTransfer.getData("text/plain");

    const mapToUpdatedStatus = (task) =>
      task.id === draggedTaskId ? { ...task, status: newStatus } : task;
    setTasks((prev) => prev.map(mapToUpdatedStatus));

    const findByDraggedTaskId = (task) => task.id === draggedTaskId;
    const task = tasks.find(findByDraggedTaskId);
    showToast(`${task.title} moved to ${newStatus}`, "success");
  };

  return { handleDrop };
}
