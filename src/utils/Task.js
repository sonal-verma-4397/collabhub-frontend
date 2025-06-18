import { validateTask } from "./validations";

export function createTask(setTasks, showToast, taskInput) {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newTask = {
    id: `task-${new Date().getTime()}`,
    createdAt,
    updatedAt,
    ...taskInput,
  };

  if (!validateTask(newTask, showToast)) throw new Error("validation fail");

  setTasks((prevTasks) => [...prevTasks, newTask]);
  showToast(`${taskInput.title} added successfully`);
  console.log(newTask);
}

export function editTask(setTasks, showToast, modifiedTask, oldTask) {
  console.log(modifiedTask);

  if (!validateTask(modifiedTask, showToast)) {
    showToast(`Task validation failed`, "error");
    throw new Error(`Task validation failed`);
  }

  function mapToModifiedTask(task) {
    if (task.id === oldTask.id) {
      (task.title = modifiedTask.title),
        (task.description = modifiedTask.description),
        (task.label = modifiedTask.label),
        (task.dueDate = modifiedTask.dueDate);
    }
    return task;
  }
  setTasks((prev) => prev.map(mapToModifiedTask));
  showToast("task updated");
}
