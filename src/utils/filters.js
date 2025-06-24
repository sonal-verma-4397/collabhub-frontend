export function filterTasksByStatus(tasks, status) {
  const filterByStatus = (task) => task.status === status;
  return tasks.filter(filterByStatus);
}
