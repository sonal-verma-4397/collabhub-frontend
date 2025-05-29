import React, { useContext, useRef } from "react";
import { TitleInput } from "../ui/Input";
import { DescriptionInput } from "../ui/TextArea";
import { LabelSelect, PrioritySelect } from "../ui/Select";
import { AddTasktBtn, CloseBtn } from "../ui/Button";
import { toasterContext } from "../../context/Toaster";
import { taskContext } from "../../context/Task";
import { LIMIT } from "../../data/constants";

export default function CreateTaskForm({ setShowForm }) {
  const { showToast } = useContext(toasterContext);
  const { setTasks } = useContext(taskContext);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priorityRef = useRef(null);
  const labelRef = useRef(null);

  function validateTask(task) {
    if (task.title.length === 0) {
      showToast("Title is required", "error");
      return false;
    }

    if (task.title.length > LIMIT.title) {
      showToast("Title must be less than 100 characters", "error");
      return false;
    }
    if (task.description.length > LIMIT.description) {
      showToast("Description must be less than 200 characters", "error");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value || "no description found";
    const priority = priorityRef.current.value;
    const label = labelRef.current.value;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const task = {
      id: `task-${new Date().getTime()}`,
      title,
      description,
      priority,
      label,
      createdAt,
      updatedAt,
    };

    if (!validateTask(task)) return;

    setTasks((prevTasks) => [...prevTasks, task]);
    showToast(`${titleRef.current.value} added successfully`);
  }

  function handleFormClose() {
    setShowForm(false);
  }
  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="w-full max-w-md bg-white dark:bg-[#121316] dark:text-white p-6 rounded-xl shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2 text-center">Create Task</h2>

        <div className="space-y-3">
          <TitleInput ref={titleRef} />
          <DescriptionInput ref={descriptionRef} />
          <PrioritySelect ref={priorityRef} />
          <LabelSelect ref={labelRef} />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <CloseBtn label="Close" onClick={handleFormClose} />
          <AddTasktBtn label="Add Task" />
        </div>
      </form>
    </div>
  );
}
