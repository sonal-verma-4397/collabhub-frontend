export default function TaskCard({
  labels = [],
  assignees = [],
  title = "dummy title",
  description = "dummy description",
  status = "no status",
  priority = "no priority",
  dueDate = "2025-07-14T04:25:15.109Z",
  createdAt = "2025-07-14T04:25:15.109Z",
}) {
  return (
    <div className="group justify-between items-center flex cursor-grab select-none bg-white dark:bg-[#0F0F0F] rounded-md p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border dark:border-[#2B2B2B] shrink-0">
      <h3>{title}</h3>
    </div>
  );
}
