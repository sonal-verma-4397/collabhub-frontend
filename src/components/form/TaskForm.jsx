import React, { useContext, useEffect, useRef, useState } from "react";
import { DateInput, TitleInput } from "../ui/Input";
import { DescriptionInput } from "../ui/TextArea";
import { LabelSelect } from "../ui/Select";
import { AddBtn, CloseBtn } from "../ui/Button";
import { LIMIT } from "../../data/constants";
import LocalStorageContext from "../../context/LocalStorage";
import { toasterContext } from "../../context/Toaster";
import { createTask, editTask } from "../../utils/Task";

export default function TaskForm({
  closeForm,
  defaultLabel,
  isEdit = false,
  oldTask,
}) {
  const { showToast } = useContext(toasterContext);
  const { labels, setTasks } = useContext(LocalStorageContext);
  const [taskInput, setTaskInput] = useState({
    title: isEdit ? oldTask.title : "",
    description: isEdit ? oldTask.description : "no description found",
    label: isEdit ? oldTask.label : defaultLabel,
    dueDate: isEdit ? oldTask.dueDate : "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    isEdit
      ? editTask(setTasks, showToast, taskInput, oldTask)
      : createTask(setTasks, showToast, taskInput);
  }

  return (
    <div
      onClick={closeForm}
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-[#121316] dark:text-white p-6 rounded-xl shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2 text-center">
          {isEdit ? "Update Task" : "Create Task"}
        </h2>

        <div className="flex flex-col gap-2">
          <TitleInput
            value={taskInput.title}
            onChange={(e) => {
              setTaskInput((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            maxLength={LIMIT.TASK_TITLE}
          />
          <span className="text-sm opacity-45">{`${taskInput.title.length}/${LIMIT.TASK_TITLE}`}</span>
          <DateInput
            value={taskInput.dueDate}
            onChange={(e) => {
              setTaskInput((prev) => {
                return {
                  ...prev,
                  dueDate: new Date(e.target.value).toISOString() || "",
                };
              });
            }}
          />
          <LabelSelect
            onChange={(e) => {
              setTaskInput((prev) => {
                return { ...prev, label: e.target.value };
              });
            }}
            value={taskInput.label}
            labels={labels}
            defaultValue={defaultLabel}
          />
          <DescriptionInput
            value={taskInput.description}
            onChange={(e) => {
              setTaskInput((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
            maxLength={LIMIT.TASK_DESCRIPTION}
          />
          <span className="text-sm opacity-45">{`${taskInput.description.length}/${LIMIT.TASK_DESCRIPTION}`}</span>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <CloseBtn label="Close" onClick={closeForm} />
          <AddBtn label="Save" />
        </div>
      </form>
    </div>
  );
}
