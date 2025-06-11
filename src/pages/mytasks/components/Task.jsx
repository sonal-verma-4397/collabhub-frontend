import React, { useContext, useState } from "react";
import Menu from "../../../components/utility/Menu";
import LocalStorageContext from "../../../context/LocalStorage";
import { toasterContext } from "../../../context/Toaster";
import TaskForm from "../../../components/form/TaskForm";

export default function Task({
  id,
  title,
  description,
  label,
  handleDragStart,
}) {
  const { setTasks } = useContext(LocalStorageContext);
  const { showToast } = useContext(toasterContext);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleDeleteTask = (id) => {
    const filterByCurrentTaskId = (task) => task.id !== id;
    setTasks((prev) => prev.filter(filterByCurrentTaskId));
    showToast("Task deleted successfully", "success");
  };

  return (
    <>
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
        <Menu
          data-id={id}
          onDelete={() => handleDeleteTask(id)}
          onEdit={() => setShowTaskForm(true)}
          positionClass="top-6 right-0"
        />
      </div>
      {showTaskForm && (
        <TaskForm
          isEdit={true}
          oldTask={{ id, title, description, label }}
          closeForm={() => setShowTaskForm(false)}
        />
      )}
    </>
  );
}
