import TaskCard from "../task-card/index";

export default function TaskGroup({ tasks = [] }) {
  return (
    <div className="h-[calc(100%)] overflow-y-auto p-2">
      {tasks.map(function mapToTask(task) {
        return <TaskCard />;
      })}
    </div>
  );
}
