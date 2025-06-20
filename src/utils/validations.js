import { LIMIT } from "../data/constants";

export function validateTask(task, showToast) {
  switch (true) {
    case task.title.length === 0:
      showToast("Title is required", "error");
      return false;

    case task.title.length > LIMIT.TASK_TITLE:
      showToast("Title must be less than 100 characters", "error");
      return false;

    case task.description.length > LIMIT.TASK_DESCRIPTION:
      showToast("Description must be less than 200 characters", "error");
      return false;

    case !isValidDueDate(task.dueDate):
      showToast("Select a valid date", "error");
      return false;

    default:
      return true;
  }
}

function isValidDueDate(dueDate) {
  if (!dueDate) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  const inputDate = new Date(dueDate);
  inputDate.setHours(0, 0, 0, 0); // Ignore time, compare only date

  return inputDate >= today;
}
